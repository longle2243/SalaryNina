// Hàm tính lương và hiển thị kết quả
function tinhLuong() {
  const webInputs = document.querySelectorAll(".web");
  const hostSelects = document.querySelectorAll(".host");
  const handoverChecks = document.querySelectorAll(".handover");
  const coworkerChecks = document.querySelectorAll(".coworker");

  let tongDoanhThu = 0;
  let tongHost = 0;

  // Duyệt qua từng web để tính tổng doanh thu và tổng host
  for (let i = 0; i < webInputs.length; i++) {
    let doanhThu = parseFloat(webInputs[i].value || 0) * 1000000; // Nhân với 1 triệu
    // let host = parseFloat(hostSelects[i].value || 0);
    let hostValue = hostSelects[i].value;
    let host = 0;

    if (hostValue === "custom") {
      const customInput = hostSelects[i].nextElementSibling;
      host = parseFloat(customInput.value || 0);
    } else {
      host = parseFloat(hostValue || 0);
    }

    const isHandover = handoverChecks[i]?.checked;
    const isCoWorker = coworkerChecks[i]?.checked;

    // Điều chỉnh doanh thu và host nếu Đã Bàn Giao hoặc có Có Share Doanh Thu
    doanhThu *= isHandover ? 1 : 0.5;
    doanhThu *= isCoWorker ? 0.5 : 1;
    host *= isCoWorker ? 0.5 : 1;

    // Cộng dồn doanh thu và host
    tongDoanhThu += doanhThu;
    tongHost += host;
    tongDoanhThuTong = tongDoanhThu + tongHost;
  }

  // Lấy mức lương dựa trên tổng doanh thu
  const level = getSalaryLevel(tongDoanhThuTong);
  const luongCB = level.lcb;
  const hoaHongWeb = tongDoanhThu * level.web;
  const hoaHongHost = tongHost * level.host / 1;  // Hoa hồng host tính theo đơn vị đồng

  // Tính tổng lương
  const tongLuong = luongCB + hoaHongWeb + hoaHongHost;

  // Hiển thị kết quả lên giao diện
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <p><strong>Tổng Doanh thu:</strong> ${tongDoanhThuTong.toLocaleString()} đ</p>
    <p><strong>Lương cơ bản (LCB):</strong> ${luongCB.toLocaleString()} đ</p>
    <p><strong>Hoa hồng web:</strong> ${hoaHongWeb.toLocaleString()} đ</p>
    <p><strong>Hoa hồng host:</strong> ${hoaHongHost.toLocaleString()} đ</p>
    <p><strong><u>Tổng lương nhận:</u></strong> ${tongLuong.toLocaleString()} đ</p>
  `;

  // Hiển thị kết quả
  resultDiv.classList.add('show');
}

// Hàm lấy mức lương theo tổng doanh thu
function getSalaryLevel(tongDoanhThuTong) {
  if (tongDoanhThuTong < 5000000) {
    return {
      lcb: 0,
      web: 0.1,
      host: 0.1
    };
  } else if (tongDoanhThuTong >= 5000000 && tongDoanhThuTong < 8000000) {
    return {
      lcb: 2000000,
      web: 0.1,
      host: 0.1
    };
  } else if (tongDoanhThuTong >= 8000000 && tongDoanhThuTong < 12000000) {
    return {
      lcb: 2500000,
      web: 0.1,
      host: 0.15
    };
  } else if (tongDoanhThuTong >= 12000000 && tongDoanhThuTong < 16000000) {
    return {
      lcb: 3000000,
      web: 0.15,
      host: 0.15
    };
  } else if (tongDoanhThuTong >= 16000000 && tongDoanhThuTong < 20000000) {
    return {
      lcb: 4000000,
      web: 0.15,
      host: 0.15
    };
  } else if (tongDoanhThuTong >= 20000000 && tongDoanhThuTong < 25000000) {
    return {
      lcb: 5000000,
      web: 0.18,
      host: 0.15
    };
  } else if (tongDoanhThuTong >= 25000000 && tongDoanhThuTong < 30000000) {
    return {
      lcb: 6000000,
      web: 0.2,
      host: 0.15
    };
  } else if (tongDoanhThuTong >= 30000000 && tongDoanhThuTong < 40000000) {
    return {
      lcb: 7000000,
      web: 0.25,
      host: 0.2
    };
  } else if (tongDoanhThuTong >= 40000000 && tongDoanhThuTong < 55000000) {
    return {
      lcb: 8000000,
      web: 0.3,
      host: 0.2
    };
  } else if (tongDoanhThuTong >= 55000000 && tongDoanhThuTong < 70000000) {
    return {
      lcb: 9000000,
      web: 0.35,
      host: 0.2
    };
  } else {
    return {
      lcb: 10000000,
      web: 0.35,
      host: 0.25
    };
  }
}

// Hàm thêm Web vào form
function addWebInput() {
  const webContainer = document.getElementById("webs");

  // Tạo một web item mới
  const newWebItem = document.createElement("div");
  newWebItem.classList.add("web-item");

  // Tạo các input cho web
  newWebItem.innerHTML = `
    <label for="web1">Doanh thu Web:</label>
    <input type="number" class="web" placeholder="VD: 12" /> <!-- Nhập số triệu, ví dụ 12 cho 12 triệu -->
    
    <label for="host1">Gói host:</label>
    <select class="host" onchange="toggleCustomHostInput(this)">
      <option value="0">-- Chọn gói --</option>
      <option value="2388000">2GB – 2.388.000 đ</option>
      <option value="4872000">5GB – 4.872.000 đ</option>
      <option value="6504000">8GB – 6.504.000 đ</option>
      <option value="7200000">10GB – 7.200.000 đ</option>
      <option value="8160000">12GB – 8.160.000 đ</option>
      <option value="9600000">15GB – 9.600.000 đ</option>
      <option value="12000000">20GB – 12.000.000 đ</option>
      <option value="16080000">30GB – 16.080.000 đ</option>
      <option value="20080000">40GB – 20.080.000 đ</option>
      <option value="24000000">50GB – 24.000.000 đ</option>
      <option value="28008000">60GB – 28.008.000 đ</option>
      <option value="32040000">70GB – 32.040.000 đ</option>
      <option value="43200000">100GB – 43.200.000 đ</option>
      <option value="72000000">200GB – 72.000.000 đ</option>
      <option value="96000000">300GB – 96.000.000 đ</option>
      <option value="132000000">500GB – 132.000.000 đ</option>
      <option value="214800000">1TB – 214.800.000 đ</option>
      <option value="294000000">2TB – 294.000.000 đ</option>
      <option value="custom">Tự nhập</option>
    </select>
    <input type="number" class="custom-host" style="display:none;" placeholder="Nhập giá host (đồng)" />

    <label for="handover">Đã Bàn Giao:</label>
    <input type="checkbox" class="handover" />
    
    <label for="coworker">Có Share Doanh Thu:</label>
    <input type="checkbox" class="coworker" />
  `;

  // Thêm vào container
  webContainer.appendChild(newWebItem);
}

function toggleCustomHostInput(selectElement) {
  const customInput = selectElement.nextElementSibling; // giả sử input nằm ngay sau select
  if (selectElement.value === "custom") {
    customInput.style.display = "inline-block";
  } else {
    customInput.style.display = "none";
  }
}
