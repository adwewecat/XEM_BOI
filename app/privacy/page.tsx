export const metadata = {
  title: 'Chính Sách Quyền Riêng Tư · Tử Vi Đẩu Số',
  description: 'Chính sách bảo mật quyền riêng tư của nền tảng Tử Vi Đẩu Số & Bách Gia Thuật Số',
};

export default function PrivacyPage() {
  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'var(--bg-0)',
          borderBottom: '1px solid var(--bdr)',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <a
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            color: 'var(--tx-3)',
            textDecoration: 'none',
          }}
        >
          <span style={{ fontSize: '16px' }}>‹</span>
          <span>Về Trang Chủ</span>
        </a>
        <div style={{ width: '1px', height: '20px', background: 'var(--bdr-med)' }} />
        <span style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.2em' }}>
          TỬ VI ĐẨU SỐ
        </span>
      </header>
      <main
        style={{
          maxWidth: 800,
          margin: '0 auto',
          padding: '60px 24px 80px',
          color: 'var(--tx-1)',
          lineHeight: 1.8,
        }}
      >
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: 'var(--tx-0)' }}>
          Chính Sách Quyền Riêng Tư
        </h1>
        <p style={{ fontSize: 13, color: 'var(--tx-3)', marginBottom: 32 }}>
          Cập nhật lần cuối: Tháng 11/2026
        </p>

        <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12, color: 'var(--ac)' }}>
          1. Dữ Liệu Thu Thập & Mục Đích Sử Dụng
        </h2>
        <p>
          Để hỗ trợ lập lá số Tử Vi, giải đoán Kinh Dịch và tra cứu mệnh lý cá nhân, hệ thống cho
          phép bạn nhập một số thông tin:
        </p>
        <ul style={{ paddingLeft: 24 }}>
          <li>
            <strong>Thông tin lập lá số:</strong> Họ tên (tùy chọn), ngày tháng năm sinh (Dương lịch
            hoặc Âm lịch), giờ và phút sinh, giới tính, tỉnh/thành phố nơi sinh (dùng để tính kinh độ
            bù trừ Giờ Chân Thái Dương).
          </li>
          <li>
            <strong>Dữ liệu lưu trữ cục bộ (Local Storage):</strong> Mọi thông tin lá số của bạn
            được lưu trữ an toàn ngay trên trình duyệt máy tính của bạn (Local Storage) để tự động
            đồng bộ giữa các phân hệ (Lá Số Tử Vi, Tử Bình Bát Tự, Bói Hữu Duyên, Trạch Nhật). Hệ
            thống không gửi dữ liệu cá nhân này về bất kỳ máy chủ giám sát hay cơ sở dữ liệu bên
            thứ ba nào.
          </li>
          <li>
            <strong>Lịch sử tra cứu & Trải nghiệm người dùng:</strong> Lưu trữ tùy chọn giao diện
            (sáng/tối) và trạng thái hiển thị của các bảng tra cứu nhằm tối ưu hóa trải nghiệm.
          </li>
        </ul>

        <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12, color: 'var(--ac)' }}>
          2. Bảo Mật & An Toàn Thông Tin
        </h2>
        <p>
          Chúng tôi coi trọng tính riêng tư tuyệt đối của người dùng. Toàn bộ thuật toán lập lá số,
          an sao, an cung, bói dịch và trạch nhật đều được thực thi trực tiếp trên mã nguồn nền tảng:
        </p>
        <ul style={{ paddingLeft: 24 }}>
          <li>Không chia sẻ, không thương mại hóa và không bán dữ liệu người dùng cho bất kỳ bên thứ ba nào.</li>
          <li>Không yêu cầu quyền truy cập danh bạ, vị trí GPS thời gian thực hay dữ liệu nhạy cảm.</li>
          <li>Mọi kết nối truy cập đều được mã hóa theo giao thức chuẩn HTTPS bảo mật cao.</li>
        </ul>

        <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12, color: 'var(--ac)' }}>
          3. Quyền Kiểm Soát Dữ Liệu Của Bạn
        </h2>
        <ul style={{ paddingLeft: 24 }}>
          <li>
            <strong>Toàn quyền chỉnh sửa hoặc xóa:</strong> Bạn có thể bấm nút &quot;Nhập lại thông
            tin&quot; hoặc xóa dữ liệu bộ nhớ trình duyệt bất cứ lúc nào để xóa sạch mọi thông tin đã
            lưu.
          </li>
          <li>
            <strong>Không bắt buộc định danh:</strong> Bạn hoàn toàn có thể sử dụng tên giả định
            hoặc để trống tên khi khởi tạo và tra cứu lá số.
          </li>
        </ul>

        <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12, color: 'var(--ac)' }}>
          4. Tuyên Bố Miễn Trừ Trách Nhiệm Pháp Lý
        </h2>
        <p>
          Tất cả các nội dung luận giải, phân tích lá số, bói dịch và xem ngày lành dữ trên nền tảng
          đều nhằm mục đích <strong>nghiên cứu văn hóa học thuật cổ truyền và giải trí lành mạnh</strong>,
          tuyệt đối <strong>không cổ xúy mê tín dị đoan</strong>, và <strong>không công kích bất kỳ cá
          nhân hay tổ chức nào</strong>. Người dùng tự chịu trách nhiệm về các quyết định trong đời
          sống thực tế.
        </p>

        <p style={{ marginTop: 48, fontSize: 13, color: 'var(--tx-3)' }}>
          <a href="/terms" style={{ color: 'var(--ac)', textDecoration: 'none' }}>
            Điều Khoản Sử Dụng
          </a>{' '}
          ·{' '}
          <a href="/" style={{ color: 'var(--ac)', textDecoration: 'none' }}>
            Về Trang Chủ
          </a>
        </p>
      </main>
    </>
  );
}
