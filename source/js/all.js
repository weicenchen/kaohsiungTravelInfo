//事件監聽
document.querySelector('.selectDist').addEventListener('change', update);
document.querySelector('.hot-dist').addEventListener('click', updateHotDist);

const jsonUrl = 'https://raw.githubusercontent.com/hsiangfeng/JSHomeWork/master/JSON/datastore_search.json';
let jsonData = {};

//刷新下拉選單
function updateSelectDist(e) {
    fetch(jsonUrl, { method: 'get' })
        .then((response) => {
            return response.json();
        }).then((data) => {
            jsonData = data.result.records;
            //把全部地區資料抓出來
            let dataZoneAll = [];
            for (let i = 0; jsonData.length > i; i++) {
                dataZoneAll.push(jsonData[i].Zone);
            }
            //篩選地區資料抓出來
            let dataZone = [];
            dataZoneAll.forEach(function (value) {
                if (dataZone.indexOf(value) == -1) {
                    dataZone.push(value);
                }
            });
            let str = `<option selected value="- - 請選擇行政區 - -">- - 請選擇行政區 - -</option>`;
            for (let i = 0; i < dataZone.length; i++) {
                str += `<option value="${dataZone[i]}">${dataZone[i]}</option>`;
            }
            document.querySelector('.selectDist').innerHTML = str;
        });
}
updateSelectDist();

//更新頁面
function update(e) {
    //更新頁面
    let disValue = e.target.value;
    let str = '';
    for (let i = 0; i < jsonData.length; i++) {
        if (disValue === jsonData[i].Zone) {
            str += `<div class="col-md-6 mb-md-6 mb-1">
                        <div class="card border-0 boxShadow">
                        <div class="card-img-top bg-cover"
                        style="background-image: url(${jsonData[i].Picture1}); height: 165px;">
                        <div 
                        class="card-img-overlay text-white d-flex justify-content-between align-items-end pl-4 pb-150">
                        <h3 class="card-title mb-0">${jsonData[i].Name}</h3>
                        <p class="card-text d-none d-md-inline-block">${disValue}</p>
                        </div>
                        </div>
                        <ul class="spotInfo list-group px-4 py-2">
                        <li class="list-group-item border-0 p-0 mb-2">
                        <img src="images/icons_clock.png" style="padding-right: 9px;">${jsonData[i].Opentime}</li>
                        <li class="list-group-item border-0 p-0 mb-2"><img src="images/icons_pin.png"
                        style="padding: 0 10px 0 1px;">${jsonData[i].Add}
                        </li>
                        <li class="list-group-item border-0 p-0 d-flex">
                        <span class="list-group-item border-0 p-0"><img src="images/icons_phone.png" style="padding: 0 12px 0 3px;">${jsonData[i].Tel}</span>
                        <span class="ticketInfo list-group-item border-0 p-0"><img src="images/icons_tag.png" style="padding-right: 8px;">
                        ${jsonData[i].Ticketinfo}</span>
                        </li>
                        </ul>
                        </div>
                        </div>`
        }
    }
    document.querySelector('.spotCard').innerHTML = str;
    document.querySelector('.distTitle').textContent = disValue;
}

function updateHotDist(e) {
    if (e.target.nodeName !== 'BUTTON') { return };
    e.preventDefault();
    update(e);
}