
let myLeads = []
let oldLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const saveBtn = document.getElementById("save-btn")

const leadsFromLocalStorage = JSON.parse (localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
	myLeads = leadsFromLocalStorage
	render(myLeads)
}
//const tabs = ['{url: "https://www.google.com/"}']
// 1. Wrap the code below in a renderLeads() function
function render(leads){
	let listItems = ""
	for (let i = 0; i < leads.length; i++) {
    listItems += "<li><a target = '_blank' href = '"+leads[i]+"'>"+leads[i]+"</a></li>"
     //(This can be written as)
        //listItems += '
          //  <li>
            //    <a target = '_blank' href = '${myLeads[i]}'>
              //      ${"+myLeads[i]+"}
                //</a>
            //</li>
        //'
    }
	ulEl.innerHTML = listItems
}
saveBtn.addEventListener("click",function(){
	chrome.tabs.query({active: true,currentWindow: true}, function(tabs){
		myLeads.push(tabs[0].url)
		localStorage.setItem("myLeads", JSON.stringify(myLeads))
		render(myLeads)
	})
})

//tabBtn.addEventListener("click",function(){
//	chrome.tabs.query({active: true, currentWindows: true}, function(tabs){
//		myLeads.push(tabs[0].url)
//		localStorage.setItem("myLeads", JSON.stringify(myLeads))
//		render(myLeads)
//	})
//})

deleteBtn.addEventListener("dblclick", function(){
	console.log("Double click")
	localStorage.clear()
	myLeads = []
	render(myLeads)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    //console.log(myLeads)
    render(myLeads)
    // 2. Call the renderLeads() function
    //console.log(localStorage("myLeads"))
})