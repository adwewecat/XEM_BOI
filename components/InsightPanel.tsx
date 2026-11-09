'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ZiweiChart, Palace } from '@/lib/ziwei/types';
import type { TimeView } from './TimeNav';
import { generateLocalInsight } from '@/lib/ziwei/vietnamese';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  hidden?: boolean; // don't show user bubble for auto/topic messages
}

interface SelectedSiHua {
  starName: string;
  siHua: string;
  view: TimeView;
}

interface InsightPanelProps {
  chart: ZiweiChart;
  selectedPalace?: Palace | null;
  selectedSiHua?: SelectedSiHua | null;
}

const TOPICS = [
  { key: 'overview',     label: 'Mệnh Cách', zh: '命格' },
  { key: 'love',        label: 'Tình Duyên', zh: '感情' },
  { key: 'career',      label: 'Sự Nghiệp', zh: '事业' },
  { key: 'wealth',      label: 'Tài Lộc', zh: '财运' },
  { key: 'health',      label: 'Sức Khỏe', zh: '健康' },
  { key: 'personality', label: 'Tính Cách', zh: '性格' },
] as const;

const TOPIC_PROMPTS: Record<string, string> = {
  overview: `Xin hãy phân tích tổng quan mệnh cách theo cấu trúc sau:

**【Định Tính Mệnh Cách】**
Khái quát một câu về cốt lõi cách cục và khí chất bản mệnh đương số.

**【Luận Giải Chính Tinh】**
Đặc tính cốt lõi của các sao chính tinh tại Mệnh Cung theo hệ phái Thiên Kỷ của danh sư Nghê Hải Hà.

**【Tam Phương Tứ Chính】**
Phân tích liên hoàn giữa Tài Bạch, Quan Lộc, Thiên Di và Mệnh Cung để định hình toàn bộ cục diện.

**【Đại Hạn Hiện Tại】**
Xu thế vận hạn 10 năm hiện tại và những điểm trọng yếu cần lưu tâm nhất.

**【Ưu Thế & Lời Khuyên Tu Dưỡng】**
Thiên phú bẩm sinh, thế mạnh cùng những nguy cơ và bài học cuộc đời cần tu dưỡng.`,

  love: `Xin hãy phân tích chuyên sâu vận trình tình cảm và hôn nhân theo cấu trúc sau:

**【Cục Diện Tình Duyên】**
Định tính một câu về duyên phận tình cảm trong đời.

**【Phân Tích Cung Phu Thê】**
Các chính tinh, phụ tinh và Tứ Hóa tọa thủ tại cung Phu Thê theo quan điểm danh sư Nghê Hải Hà.

**【Tam Phương Liên Động】**
Tác động từ các cung vị liên đới tới đời sống tình cảm gia đạo.

**【Vận Trình Tình Duyên Đại Hạn】**
Xu thế tình cảm trong 10 năm hiện tại và những mốc thời gian bước ngoặt.

**【Lời Khuyên Ứng Xử】**
Những lời khuyên hành sự thiết thực giúp hòa hợp và gìn giữ hạnh phúc.`,

  career: `Xin hãy phân tích chuyên sâu vận trình sự nghiệp và công danh theo cấu trúc sau:

**【Cục Diện Sự Nghiệp】**
Định tính một câu về con đường sự nghiệp (phù hợp làm công chức, chuyên môn hay tự lập khởi nghiệp).

**【Phân Tích Cung Quan Lộc】**
Các chính tinh và Tứ Hóa tại cung Quan Lộc theo bình giải của danh sư Nghê Hải Hà.

**【Liên Kết Cung Tài Bạch】**
Mối quan hệ giữa sự nghiệp và nguồn thu tài chính, dòng tiền và cơ hội làm giàu.

**【Vận Trình Sự Nghiệp Đại Hạn】**
Định hướng phát triển công danh trong đại hạn 10 năm hiện tại.

**【Lời Khuyên Chiến Lược】**
Ngành nghề phù hợp nhất, thời điểm nên tiến hay thủ và sách lược hành sự.`,

  wealth: `Xin hãy phân tích chuyên sâu vận trình tài lộc và tiền bạc theo cấu trúc sau:

**【Cục Diện Tài Vận】**
Định tính mô hình tài lộc (tiền chủ động từ tài năng, hay thụ động, tiền đầu cơ hay tích lũy bền vững).

**【Phân Tích Cung Tài Bạch】**
Chính tinh, phụ tinh và Tứ Hóa tại cung Tài Bạch, phương thức dòng tiền lưu chuyển.

**【Cung Điền Trạch (Kho Chứa Tài Sản)】**
Năng lực tích lũy tài sản, đất đai, nhà cửa và cơ hội bất động sản.

**【Tài Vận Đại Hạn Hiện Tại】**
Xu thế tài chính trong đại hạn 10 năm này và những điều cần phòng tránh rủi ro.

**【Lời Khuyên Quản Lý Tài Chính】**
Sách lược đầu tư và bảo toàn tài sản hiệu quả nhất.`,

  health: `Xin hãy phân tích vận trình sức khỏe và thể chất theo cấu trúc sau:

**【Chính Tinh Cung Tật Ách】**
Các sao tọa thủ tại cung Tật Ách và hàm nghĩa y lý phương Đông.

**【Nguy Cơ Sức Khỏe Trọng Yếu】**
Ứng dụng lý thuyết Tử Ngọ Lưu Chú của danh y Nghê Hải Hà để chỉ rõ tạng phủ và cơ quan cần lưu tâm.

**【Diễn Biến Sức Khỏe Đại Hạn】**
Xu hướng sức khỏe trong 10 năm hiện tại và những giai đoạn thời gian nhạy cảm.

**【Lời Khuyên Dưỡng Sinh】**
Chỉ dẫn phòng ngừa bệnh tật, chế độ sinh hoạt và dưỡng sinh điều hòa khí huyết.`,

  personality: `Xin hãy giải mã chuyên sâu tính cách và tâm lý bản mệnh theo cấu trúc sau:

**【Cốt Lõi Tính Cách Mệnh Cung】**
Đặc điểm tính cách bẩm sinh sâu sắc nhất theo lời dạy của danh sư Nghê Hải Hà.

**【Tổng Hợp Tính Cách Tam Phương】**
Ảnh hưởng đa chiều từ Tài Bạch, Quan Lộc, Thiên Di tạo nên bức tranh tâm lý hoàn chỉnh.

**【Phương Thức Đối Nhân Xử Thế】**
Phong cách giao tiếp, ứng xử với gia đình, bạn bè và đối tác xã hội.

**【Thế Mạnh & Bài Học Cuộc Đời】**
Ưu điểm cần phát huy tối đa và những khuyết điểm trong tâm tính cần chuyển hóa.`,
};

const PALACE_ROLES: Record<string, string> = {
  '命宫':   'Bản Mệnh · Tính cách & Tiên thiên cách cục',
  '兄弟宫': 'Huynh Đệ · Anh em, tri kỷ, đối tác hợp tác',
  '夫妻宫': 'Phu Thê · Tình duyên, hôn nhân, phối ngẫu',
  '子女宫': 'Tử Tức · Con cái, hậu tự, nhân viên cấp dưới',
  '财帛宫': 'Tài Bạch · Tiền tài, nguồn thu, tài chính',
  '疾厄宫': 'Tật Ách · Thể chất, sức khỏe, tạng phủ',
  '迁移宫': 'Thiên Di · Xuất ngoại, cơ duyên bên ngoài',
  '交友宫': 'Nô Bộc · Bạn bè, cấp dưới, quý nhân xã hội',
  '官禄宫': 'Quan Lộc · Sự nghiệp, chức vị, học vấn',
  '田宅宫': 'Điền Trạch · Bất động sản, đất đai, nhà cửa',
  '福德宫': 'Phúc Đức · Đời sống tinh thần, phúc thọ',
  '父母宫': 'Phụ Mẫu · Cha mẹ, trưởng bối, bảo bọc',
};

/** Render AI markdown: **【Title】** → gold header, **bold** → strong */
function AiContent({ text, streaming }: { text: string; streaming?: boolean }) {
  const lines = text.split('\n');
  return (
    <div className="space-y-0.5">
      {lines.map((line, i) => {
        const sectionMatch = line.match(/^\*\*【(.+?)】\*\*$/);
        if (sectionMatch) {
          return (
            <div key={i} className="pt-3 pb-0.5 first:pt-0">
              <span className="text-[11px] font-semibold tracking-wide" style={{ color: 'var(--t-gold)' }}>
                【{sectionMatch[1]}】
              </span>
            </div>
          );
        }
        if (line.trim() === '') return <div key={i} className="h-1" />;
        const parts = line.split(/\*\*(.+?)\*\*/);
        return (
          <div key={i} className="text-[11px] leading-relaxed" style={{ color: 'var(--t-text2)' }}>
            {parts.map((part, j) =>
              j % 2 === 0
                ? part
                : <strong key={j} className="font-medium" style={{ color: 'var(--t-text)' }}>{part}</strong>
            )}
          </div>
        );
      })}
      {streaming && (
        <span
          className="inline-block w-1.5 h-3 ml-0.5 animate-pulse rounded-sm align-middle"
          style={{ background: 'var(--t-gold)', opacity: 0.6 }}
        />
      )}
    </div>
  );
}

export default function InsightPanel({ chart, selectedPalace, selectedSiHua }: InsightPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTopic, setActiveTopic] = useState<string>('overview');
  const messagesRef = useRef<Message[]>([]); // always-current copy for closures
  const loadingRef = useRef(false);
  const autoLoaded = useRef(false);
  const lastPalaceBranch = useRef<number | undefined>(undefined);
  const lastSiHuaKey = useRef<string | undefined>(undefined);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Keep refs in sync
  useEffect(() => { messagesRef.current = messages; }, [messages]);
  useEffect(() => { loadingRef.current = loading; }, [loading]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Auto-generate 命格总览 on mount
  useEffect(() => {
    if (autoLoaded.current) return;
    autoLoaded.current = true;
    sendMessage(TOPIC_PROMPTS.overview, true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Inject palace analysis when palace selected
  useEffect(() => {
    if (!selectedPalace || selectedPalace.branch === lastPalaceBranch.current) return;
    lastPalaceBranch.current = selectedPalace.branch;

    const majorStars = selectedPalace.stars.filter(s => s.type === 'major');
    const starDesc = majorStars.length > 0
      ? majorStars.map(s => `${s.name}${s.siHua ? '化' + s.siHua : ''}`).join('、')
      : '空宫（借对宫）';
    const role = PALACE_ROLES[selectedPalace.name] ?? '';

    const prompt = `请重点分析【${selectedPalace.name}】（主管：${role}），该宫主星为${starDesc}，按以下结构输出：

**【宫位定性】**
${selectedPalace.name}在命盘中的意义，以及这种星曜配置的整体判断。

**【主星解读】**
主星在此宫的倪海厦体系解读，引用具体观点。

**【三方四正联动】**
三方四正宫位对此宫的影响。

**【实际建议】**
基于此宫的具体建议。`;

    sendMessage(prompt, true);
  }, [selectedPalace]); // eslint-disable-line react-hooks/exhaustive-deps

  // 注入四化飞化分析
  useEffect(() => {
    if (!selectedSiHua) return;
    const key = `${selectedSiHua.starName}-${selectedSiHua.siHua}-${selectedSiHua.view}`;
    if (key === lastSiHuaKey.current) return;
    lastSiHuaKey.current = key;

    // 找出该星所在宫位
    const palaceOfStar = chart.palaces.find(p =>
      p.stars.some(s => s.name === selectedSiHua.starName)
    );
    const palaceName = palaceOfStar?.name ?? '未知宫位';
    const viewLabel = selectedSiHua.view === 'daxian' ? '大限' : '流年';

    const prompt = `请分析【${viewLabel}${selectedSiHua.starName}化${selectedSiHua.siHua}】的飞化影响，按以下结构输出：

**【化${selectedSiHua.siHua}基本含义】**
化${selectedSiHua.siHua}在倪海厦体系中的核心含义，以及${selectedSiHua.starName}化${selectedSiHua.siHua}的特殊含义。

**【落宫影响】**
${selectedSiHua.starName}化${selectedSiHua.siHua}落在【${palaceName}】，该宫主管的领域受到何种影响，倪师如何解读。

**【三方四正飞化路径】**
化${selectedSiHua.siHua}入${palaceName}后，对其三方四正（对宫、两个三合宫）的联动影响。

**【当前运势影响】**
在${viewLabel}时间维度下，此化${selectedSiHua.siHua}对命主近期运势的具体影响。

**【实际建议】**
基于此四化的具体可操作建议。`;

    sendMessage(prompt, true);
  }, [selectedSiHua]); // eslint-disable-line react-hooks/exhaustive-deps

  const streamResponse = async (apiMessages: { role: 'user' | 'assistant'; content: string }[]) => {
    try {
      const res = await fetch('/api/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chart, messages: apiMessages }),
      });
      if (res.status === 404) throw new Error('api-missing');
      if (!res.ok) throw new Error('请求失败');
      if (!res.body) throw new Error('无响应流');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = '';

      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split('\n')) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6);
          if (data === '[DONE]') break;
          try {
            const delta = JSON.parse(data).delta?.text ?? '';
            assistantText += delta;
            setMessages(prev => {
              const updated = [...prev];
              updated[updated.length - 1] = { role: 'assistant', content: assistantText };
              return updated;
            });
          } catch { /* skip */ }
        }
      }
    } catch {
      // Khi không có kết nối AI hoặc chạy offline, sinh luận giải chi tiết tiếng Việt tự động
      const fallbackText = generateLocalInsight(chart, activeTopic, messagesRef.current[messagesRef.current.length - 1]?.content);
      setMessages(prev => [...prev, { role: 'assistant', content: fallbackText }]);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  };

  const sendMessage = (text: string, hidden = false) => {
    if (!text.trim() || loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    const userMsg: Message = { role: 'user', content: text, hidden };
    // Capture current messages synchronously via ref (avoids stale closure)
    const apiMessages = [...messagesRef.current, userMsg].map(m => ({
      role: m.role,
      content: m.content,
    }));

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    streamResponse(apiMessages);
  };

  const handleTopicClick = (topicKey: string) => {
    if (loadingRef.current) return;
    setActiveTopic(topicKey);
    sendMessage(TOPIC_PROMPTS[topicKey], true);
  };

  const handleSend = () => {
    sendMessage(input);
  };

  return (
    <div className="flex flex-col h-full rounded-xl overflow-hidden card-glass">

      {/* ── Topic buttons ── */}
      <div className="flex-shrink-0 px-2 pt-2.5 pb-2" style={{ borderBottom: '1px solid var(--t-border)' }}>
        <div className="grid grid-cols-6 gap-1">
          {TOPICS.map(t => {
            const isActive = activeTopic === t.key;
            return (
              <button
                key={t.key}
                onClick={() => handleTopicClick(t.key)}
                disabled={loading}
                className="py-1 px-0.5 text-center rounded-lg transition-all duration-150 disabled:opacity-40 flex flex-col items-center justify-center"
                style={{
                  background: isActive ? 'rgba(212,168,67,0.15)' : 'transparent',
                  border: `1px solid ${isActive ? 'rgba(212,168,67,0.4)' : 'var(--t-border)'}`,
                  color: isActive ? 'var(--t-gold)' : 'var(--t-faint)',
                }}
              >
                <span className="text-[10px] font-semibold tracking-tight">{t.label}</span>
                <span className="text-[8px] opacity-60 leading-none mt-0.5">{t.zh}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Messages ── */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">

        {/* Loading state before first message */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-4xl mb-3" style={{ color: 'var(--t-gold)', opacity: 0.1 }}>✦</div>
            <p className="text-[11px] animate-pulse" style={{ color: 'var(--t-faint)' }}>
              Đang phân tích & giải mã mệnh cách... (命格解读生成中)
            </p>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg, i) => {
            if (msg.role === 'user' && msg.hidden) return null;

            if (msg.role === 'user') {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-end"
                >
                  <div
                    className="max-w-[85%] rounded-xl px-3 py-2 text-[11px]"
                    style={{
                      background: 'rgba(212,168,67,0.08)',
                      border: '1px solid rgba(212,168,67,0.18)',
                      color: 'var(--t-gold)',
                    }}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              );
            }

            // Assistant message
            const isLastMsg = i === messages.length - 1;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div
                  className="text-[10px] tracking-wide mb-2 flex items-center gap-1.5"
                  style={{ color: 'var(--t-faint)' }}
                >
                  <span style={{ color: 'var(--t-gold)', opacity: 0.6 }}>✦</span>
                  <span className="font-semibold text-amber-500/90">LUẬN GIẢI MỆNH LÝ</span>
                  <span className="text-[9px] text-amber-400 font-bold">Nghê Hải Hà (倪海厦)</span>
                  <span className="text-[8px] opacity-40 ml-1">· Luận Giải Thiên Kỷ</span>
                </div>
                <AiContent text={msg.content} streaming={loading && isLastMsg} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ── Input ── */}
      <div className="flex-shrink-0 px-3 pb-3 pt-2" style={{ borderTop: '1px solid var(--t-border)' }}>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Hỏi tiếp chiêm nghiệm, ví dụ: Năm nay có nên đổi việc làm ăn không?"
            disabled={loading}
            className="flex-1 rounded-lg px-3 py-2 text-[11px] focus:outline-none transition-colors"
            style={{
              background: 'var(--t-card)',
              border: '1px solid var(--t-border)',
              color: 'var(--t-text)',
            }}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="px-3.5 py-2 rounded-lg text-[11px] font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed flex flex-col items-center justify-center leading-tight"
            style={{
              background: 'rgba(212,168,67,0.18)',
              border: '1px solid rgba(212,168,67,0.35)',
              color: 'var(--t-gold)',
            }}
          >
            <span>{loading ? '…' : 'Hỏi Tiếp'}</span>
            {!loading && <span className="text-[8px] opacity-60">追问</span>}
          </button>
        </div>
      </div>

    </div>
  );
}
