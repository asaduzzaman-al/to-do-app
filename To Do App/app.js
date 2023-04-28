// get element
const todo_form = document.querySelector(".todo_form");
const counter = document.querySelector(".counter");
const alerm = document.querySelector(".alerm");
const per = document.getElementById("per");
const bar = document.querySelector(".bar");
const list_group = document.querySelector(".list-group");
const msg = document.querySelector(".msg");
const card_footer = document.querySelector(".card-footer");

// todo form submit
todo_form.onsubmit = (e) => {
  e.preventDefault();
  // get val from FormData
  const form_data = new FormData(e.target);
  const { date, time, name, client } = Object.fromEntries(form_data.entries());
  // time val
  let start_time = Date.now();
  let end_time = new Date(date + " " + time);
  let last_time = end_time.getTime();

  // form validation
  if (!name || !client || !date || !time) {
    msg.innerHTML = setAlert("All fields are required !");
  } else {
    // make the time
    const start_time = Date.now();
    const end_Time = new Date(date + " " + time);
    const last_time = end_Time.getTime();
    // get random id
    const id = Math.floor(Math.random() * 1000) + "_" + start_time;
    // get data pass
    const formData = { name, client, start_time, end_time, id, last_time };

    createLSData("todo_apps", formData);
    // form reset
    e.target.reset();
    getAllData();
  }
};
// get all product data
const getAllData = () => {
  // get LS Data
  const data = readLSData("todo_apps");
  let list = "";
  // validate
  if (!data || data.length == 0) {
    list = "";
  }

  if (data && data.length > 0) {
    data.reverse().map((item, index) => {
      list += `
            <li class="list-group-item shadow"> Client : ${item.name} | ${
        item.client
      } | Remain Time : <Strong>${futureTimeCounter(item.last_time)}</Strong>
            <button onclick="deleteList(${item.id})" class="close">×</button>
            <span style="${progressBar(
              item.start_time,
              item.last_time
            )}" class="status"></span>
            </li>`;
    });
  }
  list_group.innerHTML = list;
  // card footer data show
  card_footer.innerHTML = `<P>Total Item Number: <span>${
    data ? data.length : "No"
  } project running</span></P>`;
};
getAllData();

// show data
setInterval(() => {
  getAllData();
}, 1000);

getAllData();

// delete item
// list_group.onclick= (e) =>{
//     if(e.target.hasAttribute('deleteList')){
//         const id =e.target.getAttribute('deleteList');

//         // real All ls data
//         let allData =readLSData('todo_apps');
//         const index = allData.findIndex(data => data.id == id);
//         // index data delete
//         allData.splice(index, 1);
//         // update LS Data
//         updateLSData('todo_apps', allData);
//         // show data
//         getAllData();
//     }
// }

const deleteList = (e) => {
  const id = e;
  // read all data
  let allData = readLSData("todo_apps");
  // get data id
  const index = allData.findIndex((data) => data.id == id);
  // remove id
  allData.splice(index, 1);
  // update LS data
  updateLSData("todo_apps", allData);
  getAllData();
};
