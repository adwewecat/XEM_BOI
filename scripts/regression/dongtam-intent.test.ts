import assert from 'node:assert';
import { castDongTam } from '../../lib/metaphysics/dongtam';

console.log('Testing Dong Tam Intent & Weather Detection...');

// 1. Kiểm tra câu hỏi thời tiết: Tuyệt đối không nhầm thành nhân duyên
const weatherRes1 = castDongTam('hôm nay thời tiết thế nào', '2026-11-11', '18:58');
assert.strictEqual(
  weatherRes1.dungThan.targetName.includes('Khí hậu') || weatherRes1.dungThan.targetName.includes('Thời tiết'),
  true,
  `Hỏi thời tiết phải nhận đúng target Khí hậu/Thời tiết, nhận được: ${weatherRes1.dungThan.targetName}`
);
assert.strictEqual(
  weatherRes1.directConclusion.includes('Về nhân duyên'),
  false,
  'Hỏi thời tiết TUYỆT ĐỐI không được kết luận "Về nhân duyên"'
);
assert.strictEqual(
  weatherRes1.directConclusion.includes('Về thời tiết'),
  true,
  'Hỏi thời tiết phải kết luận "Về thời tiết"'
);

// 2. Kiểm tra câu hỏi mưa / nắng
const rainRes = castDongTam('ngày mai có mưa không', '2026-11-11', '09:00');
assert.strictEqual(
  rainRes.directConclusion.includes('Về thời tiết'),
  true,
  'Hỏi mưa phải nhận diện đúng thời tiết'
);

// 3. Kiểm tra câu hỏi nhân duyên thực thụ
const loveRes = castDongTam('bao giờ tôi có người yêu, hết ế', '2026-11-11', '10:00');
assert.strictEqual(
  loveRes.dungThan.targetName.includes('Nhân duyên') || loveRes.dungThan.targetName.includes('Tình cảm'),
  true,
  'Hỏi người yêu hết ế phải nhận đúng nhân duyên'
);

// 4. Kiểm tra câu hỏi hotline / liên lạc
const hotlineRes = castDongTam('nay hotline có gọi cho tôi nhiều không', '2026-11-11', '18:37');
assert.strictEqual(
  hotlineRes.dungThan.targetName.includes('liên lạc') || hotlineRes.dungThan.targetName.includes('Hotline'),
  true,
  'Hỏi hotline phải nhận đúng kênh liên lạc / cuộc gọi'
);

// 5. Kiểm tra câu hỏi kiếp trước
const pastLifeRes = castDongTam('kiếp trước tôi là ai', '2026-11-11', '09:24');
assert.strictEqual(
  pastLifeRes.dungThan.targetName.includes('Túc duyên') || pastLifeRes.dungThan.targetName.includes('linh hồn'),
  true,
  'Hỏi kiếp trước phải nhận đúng túc duyên'
);

console.log('✅ ALL DONG TAM INTENT TESTS PASSED!');

