let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;
//console.log(title,price,taxes,ads,discount,total,count,category,submit) to make sure I called the right


//get total 

function getTotal()
    {
    //console.log('done') //to test that the fundtion actually works whenever we write something in the input,
    //  clicking o,n the kepord and removing my hand of it

    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) 
        - +discount.value; // I have to turn them into numbers beacuse now they are strings
        total.innerHTML = result; //prints the result
        total.style.background = '#040'; //changes the color to green
    }
    else{
        total.innerHTML=''; // this empties the total place when the inputs get deleted
        total.style.background = 'rgb(153, 20, 20)' //changes the colour back to red
    }
    }

//create product
let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = [];
}
//let dataPro = [];
/*the compiler reads the program from top,after reload when it reaches this place
it will see am empty array and this will empties the array again - I guess?*/

//this is the function tjat creates a new product
submit.onclick = function(){
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if(title.value != '' 
        && price.value != '' 
        && category.value != ''
        && newPro.count < 100){
            if(mood === 'create'){
        if(newPro.count > 1){
        for(let i =0; i < newPro.count;i++){
            dataPro.push(newPro); 
        }
    }else{
        dataPro.push(newPro); // push adds an element in the end of an array
    }
    }else{
        dataPro[   tmp     ] = newPro
        mood = 'create';
        submit.innerHTML = 'create';
        count.style.display = 'block';
    
    }
    clearData();
    }
    

    //save localstorage
    localStorage.setItem('product', JSON.stringify(dataPro))//localstorage takes string
    console.log(dataPro)

    
    showData();

}


//clear inputs

function clearData(){
        title.value='';
        price.value='';
        taxes.value='';
        ads.value='';
        discount.value='';
        total.innerHTML='';
        count.value='';
        category.value='';
        
}
//read
//for loop is always used to show/read data in any project contains data
function showData()
{
    getTotal();
    let table ='';
    for(let i = 0; i < dataPro.length ; i++){
        table += `
        <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData( ${i} )" id="update">Update</button></td>
                        <td><button onclick="deleteData( ${i} )" id="delete">Delete</button></td>    
                        </tr>  
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelte = document.getElementById('deleteAll');
    if(dataPro.length>0){
        btnDelte.innerHTML = `
        <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
        `
    }else{
        btnDelte.innerHTML = '';
    }
}
showData()

//count ((how many product to create)

//delete

function deleteData(i)
{
console.log(i)
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData()
}

function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
}

//update

function updateData(i){

   title.value = dataPro[i].title;
   price.value = dataPro[i].price;
   taxes.value = dataPro[i].taxes;
   ads.value = dataPro[i].ads;
   discount.value = dataPro[i].discount;
   getTotal();
   count.style.display ='none';
   category.value = dataPro[i].category;
   submit.innerHTML ='update';
   mood = 'update';
   tmp = i; //important idea
   scroll({
        top:0,
        behavior:'smooth'
   })
}

//search
let searchMood = 'title';

function getSearchMood(id)
{
    let search = document.getElementById('search');
    if (id == 'SearchByTitle'){
        searchMood = 'title';
        
    }else{
        searchMood = 'category';
    
    }
    search.placeholder = 'search by '+ searchMood;
    search.focus()
    search.value =''
    showData();
}

function searchData(value)
{
    let table = ''
    for(let i = 0; i < dataPro.length; i++){
        if (searchMood == 'title')
        {

                if(dataPro[i].title.includes(value.toLowerCase())){

                    table += `
            <tr>
                            <td>${i}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick="updateData( ${i} )" id="update">Update</button></td>
                            <td><button onclick="deleteData( ${i} )" id="delete">Delete</button></td>    
                            </tr>  
            `;
                    
                }
            
        }else{

                if(dataPro[i].category.includes(value.toLowerCase())){

                    table += `
            <tr>
                            <td>${i}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick="updateData( ${i} )" id="update">Update</button></td>
                            <td><button onclick="deleteData( ${i} )" id="delete">Delete</button></td>    
                            </tr>  
            `;
                    
                }
        }
    }
    document.getElementById('tbody').innerHTML = table;

}





//clean data

//we need validation for the creation thing as for now, it does create empty objects its fine