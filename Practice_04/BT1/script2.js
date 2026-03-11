let students = [
{ name:"Nguyễn Tuấn", score:9 },
{ name:"Trần Bình", score:7.5 },
{ name:"Lê Minh", score:4.5 },
{ name:"Nguyễn Đức", score:6 },
{ name:"Phạm Dương", score:8.7 }
]

let filteredStudents = [...students]

let sortAsc = true

const tableBody = document.getElementById("tableBody")
const searchInput = document.getElementById("search")
const filterRank = document.getElementById("filterRank")
const scoreHeader = document.getElementById("scoreHeader")
const noResult = document.getElementById("noResult")


function getRank(score){

    if(score >= 8.5) return "Giỏi"
    if(score >= 7) return "Khá"
    if(score >= 5) return "Trung bình"

    return "Yếu"
}


function applyFilters(){

    let keyword = searchInput.value.toLowerCase()

    let rank = filterRank.value


    filteredStudents = students.filter(student=>{

        let matchName = student.name.toLowerCase().includes(keyword)

        let studentRank = getRank(student.score)

        let matchRank = rank === "all" || studentRank === rank

        return matchName && matchRank

})


filteredStudents.sort((a,b)=>{

    return sortAsc ? a.score - b.score : b.score - a.score

})


renderTable()

}


function renderTable(){

    tableBody.innerHTML = ""

    if(filteredStudents.length === 0){

        noResult.innerText = "Không có kết quả"

        return
}

noResult.innerText = ""

filteredStudents.forEach((sv,index)=>{

    let rank = getRank(sv.score)

    let tr = document.createElement("tr")

    tr.innerHTML = `
    <td>${index+1}</td>
    <td>${sv.name}</td>
    <td>${sv.score}</td>
    <td>${rank}</td>
    `

    tableBody.appendChild(tr)

})

}


searchInput.addEventListener("input",applyFilters)

filterRank.addEventListener("change",applyFilters)

scoreHeader.addEventListener("click",()=>{

    sortAsc = !sortAsc

    scoreHeader.innerText = sortAsc ? "Điểm ▲" : "Điểm ▼"

    applyFilters()

})


applyFilters()