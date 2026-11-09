export const metadata = {
  title: 'Điều Khoản Dịch Vụ · Xem Bói Tử Vi',
  description: 'Điều khoản dịch vụ và thỏa thuận người dùng của hệ thống Xem Bói Tử Vi Đẩu Số',
};

export default function TermsPage() {
  return (
    <>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--bg-0)', borderBottom: '1px solid var(--bdr)', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--tx-3)', textDecoration: 'none' }}>
          <span style={{ fontSize: '16px' }}>‹</span>
          <span>Về Trang Chủ</span>
        </a>
        <div style={{ width: '1px', height: '20px', background: 'var(--bdr-med)' }} />
        <span style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.2em', fontWeight: 700 }}>XEM BÓI TỬ VI ĐẨU SỐ</span>
      </header>

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px 80px', color: 'var(--tx-1)', lineHeight: 1.85 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: 'var(--tx-0)' }}>ĐIỀU KHOẢN DỊCH VỤ</h1>
        <p style={{ fontSize: 13, color: 'var(--tx-3)', marginBottom: 32 }}>Cập nhật lần cuối: Tháng 11/2026</p>

        {/* Khung Tuyên Bố Miễn Trừ Quan Trọng */}
        <div style={{ background: 'rgba(217,119,6,0.08)', border: '1px solid rgba(217,119,6,0.3)', padding: 18, borderRadius: 12, marginBottom: 28 }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#f59e0b', marginBottom: 6 }}>
            📜 NGUYÊN TẮC VĂN HÓA & PHÁP LÝ BẤT DI BẤT DỊCH
          </div>
          <p style={{ margin: '0 0 6px', fontSize: '13.5px', color: 'var(--tx-1)' }}>
            <strong>1. Thông tin chỉ mang tính chất giải trí, nghiên cứu văn hóa truyền thống, tuyệt đối không cổ xúy mê tín dị đoan.</strong>
          </p>
          <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--tx-1)' }}>
            <strong>2. Tất cả thông tin luận giải khách quan theo lý số học thuật, tuyệt đối không công kích bất kỳ cá nhân hay tổ chức nào.</strong>
          </p>
        </div>

        <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12, color: 'var(--tx-0)' }}>1. Tổng Quan Dịch Vụ</h2>
        <p>
          Hệ thống Xem Bói Tử Vi Đẩu Số (sau đây gọi là "Hệ Thống") cung cấp công cụ lập lá số Tử Vi, Bát Tự Tứ Trụ, Kinh Dịch, Tarot và Trạch Nhật dựa trên các thư tịch cổ công khai và giáo trình Thiên Kỷ của danh sư Nghê Hải Hà.
          Toàn bộ nội dung do hệ thống xuất ra chỉ nhằm mục đích nghiên cứu học thuật, tham khảo và trải nghiệm giải trí lành mạnh. <strong>Nội dung không cấu thành lời khuyên y khoa, khuyến nghị đầu tư tài chính, tư vấn pháp lý hay quyết định nhân sinh bắt buộc.</strong>
        </p>

        <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12, color: 'var(--tx-0)' }}>2. Quy Chuẩn Sử Dụng</h2>
        <p>Khi trải nghiệm hệ thống, người dùng cam kết:</p>
        <ul style={{ paddingLeft: 24 }}>
          <li>Chỉ sử dụng cho mục đích cá nhân, học tập và giải trí hợp pháp;</li>
          <li>Không sử dụng nội dung hệ thống vào các mục đích lừa đảo, trục lợi hay kích động mê tín dị đoan;</li>
          <li>Không thực hiện các hành vi gây cản trở, phá hoại hoặc làm gián đoạn sự vận hành bình thường của hệ thống;</li>
          <li>Chịu trách nhiệm về tính chính xác của thông tin thời điểm sinh nhập vào; hệ thống không chịu trách nhiệm đối với sự sai lệch phát sinh do dữ liệu đầu vào không chính xác.</li>
        </ul>

        <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12, color: 'var(--tx-0)' }}>3. Quyền Sở Hữu Trí Tuệ & Quy Định Chống Thu Thập Dữ Liệu</h2>
        <p style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(184,146,42,0.2)', padding: 16, borderRadius: 8 }}>
          Toàn bộ giao diện người dùng, thuật toán an sao, phương pháp hiệu chỉnh Giờ Chân Thái Dương, kho ngữ liệu luận giải 14 chính tinh và chuyên đề cách cục đều thuộc quyền sở hữu trí tuệ của đội ngũ phát triển.<br /><br />
          Nghiêm cấm hành vi sử dụng công cụ tự động (bot, scraper, crawler) để sao chép khối lượng lớn nội dung hoặc đào tạo các mô hình trí tuệ nhân tạo khi chưa có văn bản chấp thuận.
        </p>

        <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12, color: 'var(--tx-0)' }}>4. Tuyên Bố Miễn Trừ Trách Nhiệm</h2>
        <p>
          Số mệnh con người chịu tác động đa chiều từ nỗ lực tự thân (Nhân), môi trường sống (Địa) và quy luật tự nhiên (Thiên). 
          Hệ thống không cam kết tính đúng đắn tuyệt đối 100% trong mọi hoàn cảnh thực tế. Người dùng cần giữ vững tinh thần khoa học, làm chủ bản thân và chịu trách nhiệm độc lập đối với mọi quyết định trong cuộc sống của mình.
        </p>

        <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12, color: 'var(--tx-0)' }}>5. Luật Áp Dụng</h2>
        <p>
          Các điều khoản này được diễn giải và điều chỉnh theo quy định của pháp luật nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.
        </p>

        <p style={{ marginTop: 48, fontSize: 13, color: 'var(--tx-3)' }}>
          <a href="/privacy" style={{ color: 'var(--ac)', textDecoration: 'none' }}>Chính Sách Quyền Riêng Tư</a> · <a href="/" style={{ color: 'var(--ac)', textDecoration: 'none' }}>Về Trang Chủ</a>
        </p>
      </main>
    </>
  );
}
