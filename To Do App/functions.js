/** Alert function */

const setAlert = (msg, type='danger') => {
    return `<p class="alert alert-${type} d-flex justify-content-between">${ msg } <button data-bs-dismiss="alert" class="btn-close"></button></p>`;
}

/**
 * Time Counter
 */

const futureTimeCounter = (last_time) => {
//  get timestamps
    // let start_time = Date.now();
    // let end_time = new Date(date + ' ' + time);
    // let last_time = end_time.getTime();
    let order_time = Math.floor(Math.abs(last_time - Date.now()));

    let totall_sec = Math.floor(order_time / 1000);
    let totall_min = Math.floor(totall_sec / 60);
    let totall_hour = Math.floor(totall_min / 60);
    let totall_days = Math.floor(totall_hour / 24);

    let hours = totall_hour - (totall_days * 24);
    let min = totall_min - (totall_days * 24 * 60) - (hours * 60);
    let sec = totall_sec - (totall_days * 24 * 60 * 60) - (hours * 60 *60) - (min * 60);

    if(last_time < Date.now()){
        return `[ <strong style="color: red;">Time Over</strong> ]`;
    }else{
        return `[${totall_days} Days : ${hours} Hour : ${min} Min : ${sec} Sec]`;

    }
}

// progress bar
const progressBar = (start_time, last_time) => {
    let time_diff = last_time - start_time;
    let time_change =last_time - Date.now();

    const perWidth= Math.floor((100 * time_change) / time_diff);

    let width = '';

    if(perWidth >=1 && perWidth <=30){
        width = `width:${perWidth}%; background-color:pink;`;
    }else if(perWidth >=31 && perWidth <=40){
        width = `width:${perWidth}%; background-color:orange;`;
    }else if(perWidth >=41 && perWidth <=70){
        width = `width:${perWidth}%; background-color:green;`;
    }else if(perWidth >=71 && perWidth <=100){
        width = `width:${perWidth}%; background-color:blue;`;
    }else{
        width = `width:100%; background-color:red;`;
    }
    return width;
    
}

/**
 * counter per
 */

// const counterPer = (start_time, end_time) => {
//     let time_diff = end_time - start_time;
//     let time_change =end_time - Date.now();

//     return Math.floor(100 * time_change) / time_diff;
// }


/**
 * get all LS Data
 */

const readLSData = (key) => {
    if(localStorage.getItem(key)){
        return JSON.parse(localStorage.getItem(key));
    }else{
     return false;
    }
}

/**
 * set value LS
 */

const createLSData = (key, value) =>{
    // init value
     let data = [];
     
     if(localStorage.getItem(key)){
        data = JSON.parse(localStorage.getItem(key));
     }
     data.push(value);
     localStorage.setItem(key, JSON.stringify(data));

}

// update LS data
const updateLSData = (key, arry) =>{
    localStorage.setItem(key, JSON.stringify(arry));
}