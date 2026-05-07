function showSection(id){
 document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
 document.getElementById(id).classList.add('active');
}

function login(){
 let u=document.getElementById('username').value;
 let p=document.getElementById('password').value;
 if(u==='admin'&&p==='1234'){
  alert("Login successful!");
 } else alert('Invalid login');
}

let cart=[];
let total=0;

function addToCart(name,price){
 cart.push({name,price});
 total+=price;
 renderCart();
}

function removeItem(index){
 total-=cart[index].price;
 cart.splice(index,1);
 renderCart();
}

function renderCart(){
 let list=document.getElementById('cartList');
 list.innerHTML='';
 cart.forEach((c,i)=>{
  let li=document.createElement('li');
  li.innerHTML=`${c.name} - ₱${c.price} <button onclick="removeItem(${i})">Remove</button>`;
  list.appendChild(li);
 });
 document.getElementById('total').innerText=total;
}

function openCheckout(){
 document.getElementById('checkoutModal').style.display='block';
 document.getElementById('summary').innerHTML=`<p>Total: ₱${total}</p>`;
}

function closeCheckout(){
 document.getElementById('checkoutModal').style.display='none';
}

function confirmOrder(){
 let name=document.getElementById('name').value;
 let address=document.getElementById('address').value;
 let contact=document.getElementById('contact').value;

 let order={
   name,
   address,
   contact,
   total,
   date:new Date().toLocaleString()
 };

 let history=JSON.parse(localStorage.getItem('orders')||'[]');
 history.push(order);
 localStorage.setItem('orders',JSON.stringify(history));

 alert("Order Confirmed!");

 cart=[];
 total=0;
 renderCart();
 closeCheckout();
 loadHistory();
}

window.onload=function(){
 loadHistory();
}

function loadHistory(){
 let box=document.getElementById('historyBox');
 let history=JSON.parse(localStorage.getItem('orders')||'[]');

 box.innerHTML='';

 if(history.length===0){
   box.innerHTML="<p>No orders yet.</p>";
   return;
 }

 history.forEach(h=>{
  box.innerHTML+=`
  <div style="border:1px solid #ccc;margin:10px;padding:10px">
  <b>${h.name}</b><br>
  ${h.address}<br>
  ${h.contact}<br>
  Total: ₱${h.total}<br>
  <small>${h.date}</small>
  </div>`;
 });
}