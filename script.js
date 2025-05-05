let webCount = 1;

function addWebInput() {
  webCount++;

  const newWebItem = document.createElement('div');
  newWebItem.classList.add('web-item');
  newWebItem.setAttribute('id', `web-item-${webCount}`);

  newWebItem.innerHTML = `
    <label for="web${webCount}">Doanh thu Web ${webCount} (triệu):</label>
    <input type="number" class="web" placeholder="VD: 5" id="web${webCount}" />

    <label for="host${webCount}">Gói host ${webCount}:</label>
    <select class="host" id="host${webCount}">
      <option value="0">-- Chọn gói --</option>
      <option value="2388000">2GB – 2.388.000đ</option>
      <option value="4872000">5GB – 4.872.000đ</option>
      <option value="6504000">8GB – 6.504.000đ</option>
      <option value="7200000">10GB – 7.200.000đ</option>
      <option value="8160000">12GB – 8.160.000đ</option>
      <option value="9600000">15GB – 9.600.000đ</option>
      <option value="12000000">20GB – 12.000.000đ</option>
      <option value="16080000">30GB – 16.080.000đ</option>
      <option value="20080000">40GB – 20.080.000đ</option>
      <option value="24000000">50GB – 24.000.000đ</option>
      <option value="28008000">60GB – 28.008.000đ</option>
      <option value="32040000">70GB – 32.040.000đ</option>
      <option value="43200000">100GB – 43.200.000đ</option>
      <option value="72000000">200GB – 72.000.000đ</option>
      <option value="96000000">300GB – 96.000.000đ</option>
      <option value="132000000">500GB – 132.000.000đ</option>
      <option value="214800000">1TB – 214.800.000đ</option>
      <option value="294000000">2TB – 294.000.000đ</option>
    </select>
  `;

  document.getElementById('webs').appendChild(newWebItem);
}

function tinhLuong() {
  const webs = document.querySelectorAll('.web');
  const hosts = document.querySelectorAll('.host');
  let totalWeb = 0;
  let totalHost = 0;

  webs.forEach((input, index) => {
    totalWeb += Number(input.value) * 1000000;
    totalHost += Number(hosts[index].value);
  });

  const total = totalWeb + totalHost;

  let lcb = 0;
  let hoaHongWeb = 0;
  let hoaHongHost = 0;

  const muc = [
    { min: 70000000, lcb: 10000000, web: 0.35, host: 0.25 },
    { min: 55000000, lcb: 9000000, web: 0.35, host: 0.2 },
    { min: 40000000, lcb: 8000000, web: 0.3, host: 0.2 },
    { min: 30000000, lcb: 7000000, web: 0.25, host: 0.2 },
    { min: 25000000, lcb: 6000000, web: 0.2, host: 0.15 },
    { min: 20000000, lcb: 5000000, web: 0.18, host: 0.15 },
    { min: 16000000, lcb: 4000000, web: 0.15, host: 0.15 },
    { min: 12000000, lcb: 3000000, web: 0.15, host: 0.15 },
    { min: 8000000, lcb: 2500000, web: 0.1, host: 0.15 },
    { min: 5000000, lcb: 2000000, web: 0.1, host: 0.1 },
    { min: 0, lcb: 0, web: 0.1, host: 0.1 },
  ];

  for (const m of muc) {
    if (total >= m.min) {
      lcb = m.lcb;
      hoaHongWeb = totalWeb * m.web;
      hoaHongHost = totalHost * m.host;
      break;
    }
  }

  const tongLuong = lcb + hoaHongWeb + hoaHongHost;

  document.getElementById("result").innerHTML = ` 
    <div class="total-income">Tổng Doanh Thu (Web + Host): ${total.toLocaleString()} VND</div>
    <div>Lương Cơ Bản (LCB): <span class="highlight">${lcb.toLocaleString()} VND</span></div>
    <div>Hoa hồng Web: <span class="highlight">${hoaHongWeb.toLocaleString()} VND</span></div>
    <div>Hoa hồng Host: <span class="highlight">${hoaHongHost.toLocaleString()} VND</span></div>
    <hr>
    <div class="total-income">Tổng Lương Thực Nhận: <span class="highlight">${tongLuong.toLocaleString()} VND</span></div>
  `;
}
