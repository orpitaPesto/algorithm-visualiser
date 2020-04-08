let linear_array = [];
let linear_value;
let linearFound = -1;

let binary_array = [];
let binary_value;
let binaryFound = -1;
function checkArray(){
    let linearSerachArray = document.getElementById('linear_array').value;
    if(linearSerachArray.indexOf(',') === -1){
        linear_array.push(linearSerachArray);
    }
    linear_array = linearSerachArray.split(",");
    if(linear_array.length > 0)
    {
        document.getElementById("linearSerachBtn").disabled = false;
    }
    populateAsTable(linear_array, 'linearTable','linear');
}
function checkBBinaryArray(){
    let binarySerachArray = document.getElementById('binary_array').value;
    if(binarySerachArray.indexOf(',') === -1){
        binary_array.push(binarySerachArray);
    }
    if (binarySerachArray.match(/^[0-9,]+$/)){
    binary_array = binarySerachArray.split(",").sort(function(a,b){
            if(a > b) return 1;
            if(a < b) return -1;
            return 0;
        });
    }
    else{
        
        binary_array = binarySerachArray.split(",").sort();
    }
    
    if(binary_array.length > 0)
    {
        document.getElementById("binarySerachBtn").disabled = false;
    }
    populateAsTable(binary_array, 'binaryTable','binary');
}

function populateAsTable(tabledata, id, tag)
{
    document.getElementById(id).innerHTML = "";
    let row = document.getElementById(id).insertRow(0);
    let cell = row.insertCell(0);
    cell.innerHTML = "Array : "
    let row2;
    if(tag !== "selection_sort" && tag !== "bubble_sort" && tag !== "insertion_sort")
    {
        row2 = document.getElementById(id).insertRow(1);
        cell = row2.insertCell(0);
        cell.innerHTML = "Index : ";
    } 
    
    let row3;
    if (tag === "binary") 
    {
         row3 = document.getElementById(id).insertRow(2);
        cell = row3.insertCell(0);
        cell.innerHTML = "Position : ";
    }
    
    tabledata.forEach((item, i) =>{
        cell = row.insertCell(i+1);
        

        cell.id = tag + "_cell_"+item +"_"+i;
        cell.innerHTML= item;
        if(tag !== "selection_sort" && tag !== "bubble_sort" && tag !== "insertion_sort")
        {
            cell = row2.insertCell(i+1);
            cell.id = tag+ "_cell_index_"+item+"_"+i;
            cell.innerHTML= i;
        }
        
        if (tag === "binary") 
        {
            cell = row3.insertCell(i+1);
            cell.id = tag+ "_cell_position_"+item+"_"+i;
            cell.innerHTML= "";
        }
    });
}


function findLinearElement()
{
    clearStyle();
    document.getElementById('linear_search_result').innerHTML = "";

    linear_value = document.getElementById("linear_search").value;
    linearSearch(linear_array, linear_value);
    document.getElementById('linear_search_result').innerHTML = "not found";
}

function linearSearch(arr, elToFind) {
    linearFound = -1;
    for (let i=0; i<arr.length; i++) {
        if(linearFound !== -1)
        {
            return linearFound;
        }
        else{
            task(arr, i, elToFind);
        }
    }
}

function task(arr, i, elToFind)
{
    setTimeout(function() { 
        if(linearFound === -1)
        {
            if(i !==0)
            {
                document.getElementById('linear_cell_'+arr[i-1]+"_"+(i-1)).classList.remove("coloredCells");
                document.getElementById('linear_cell_index_'+arr[i-1]+"_"+(i-1)).classList.remove("coloredCells");
            }
            document.getElementById('linear_cell_'+arr[i]+"_"+i).classList.add("coloredCells");
            document.getElementById('linear_cell_index_'+arr[i]+"_"+i).classList.add("coloredCells");
            console.log("i:", i);
            console.log("arr[i] :", arr[i]);
            console.log("foundd", arr[i],"po :", elToFind)
            if (arr[i] == elToFind) 
            {
                document.getElementById('linear_cell_'+arr[i]+"_"+i).classList.remove("coloredCells");
                document.getElementById('linear_cell_index_'+arr[i]+"_"+i).classList.remove("coloredCells");
                document.getElementById('linear_cell_'+arr[i]+"_"+i).classList.add("success");
                document.getElementById('linear_cell_index_'+arr[i]+"_"+i).classList.add("success");
                linearFound = i;
                document.getElementById('linear_search_result').innerHTML = i;
            }
        }
        
    }, 1000 * i);
    
}

function clearStyle()
{
    for (let i=0; i<linear_array.length; i++) 
    {
        document.getElementById('linear_cell_'+linear_array[i]+"_"+i).classList.remove("coloredCells");
        document.getElementById('linear_cell_index_'+linear_array[i]+"_"+i).classList.remove("coloredCells");
        document.getElementById('linear_cell_'+linear_array[i]+"_"+i).classList.remove("success");
        document.getElementById('linear_cell_index_'+linear_array[i]+"_"+i).classList.remove("success");
    }

}
let lowPrevious, highPrevious, midPrevious;
function findBinaryElement()
{
    if(midPrevious !== undefined && midPrevious!== null){
        document.getElementById('binary_search_result').innerHTML = "";
        document.getElementById('binary_cell_position_'+binary_array[midPrevious]+"_"+midPrevious).classList.remove('success');
        document.getElementById('binary_cell_'+binary_array[midPrevious]+"_"+midPrevious).classList.remove('success');
        document.getElementById('binary_cell_index_'+binary_array[midPrevious]+"_"+midPrevious).classList.remove('success');
    }
    
    lowPrevious = null;
    highPrevious = null;
    midPrevious = null;
    binary_value = document.getElementById("binary_search").value;
    binaryFound = binarySearch(binary_array, binary_value, 0 , binary_array.length-1);
    document.getElementById('binary_search_result').innerHTML = "not found";
}

function binarySearch(arr, item, low, high) {
    setTimeout(function() {
        console.log('Previous', lowPrevious);
        if (lowPrevious!== null)
        {
            //binary_cell_0_0 , binary_cell_index_0_0
            document.getElementById('binary_cell_position_'+arr[lowPrevious]+"_"+lowPrevious).innerHTML = "";
            document.getElementById('binary_cell_position_'+arr[highPrevious]+"_"+highPrevious).innerHTML = "";
            document.getElementById('binary_cell_position_'+arr[midPrevious]+"_"+midPrevious).innerHTML = "";
            
            document.getElementById('binary_cell_position_'+arr[lowPrevious]+"_"+lowPrevious).classList.remove('low');
            document.getElementById('binary_cell_position_'+arr[highPrevious]+"_"+highPrevious).classList.remove('high');
            document.getElementById('binary_cell_position_'+arr[midPrevious]+"_"+midPrevious).classList.remove('success');

            document.getElementById('binary_cell_'+arr[lowPrevious]+"_"+lowPrevious).classList.remove('low');
            document.getElementById('binary_cell_'+arr[highPrevious]+"_"+highPrevious).classList.remove('high');
            document.getElementById('binary_cell_'+arr[midPrevious]+"_"+midPrevious).classList.remove('success');

            document.getElementById('binary_cell_index_'+arr[lowPrevious]+"_"+lowPrevious).classList.remove('low');
            document.getElementById('binary_cell_index_'+arr[highPrevious]+"_"+highPrevious).classList.remove('high');
            document.getElementById('binary_cell_index_'+arr[midPrevious]+"_"+midPrevious).classList.remove('success');
        }
        document.getElementById('binary_cell_position_'+arr[low]+"_"+low).innerHTML = "low"
        document.getElementById('binary_cell_position_'+arr[low]+"_"+low).classList.add('low');
        document.getElementById('binary_cell_'+arr[low]+"_"+low).classList.add('low');
        document.getElementById('binary_cell_index_'+arr[low]+"_"+low).classList.add('low');

        document.getElementById('binary_cell_position_'+arr[high]+"_"+high).innerHTML = "high"
        document.getElementById('binary_cell_position_'+arr[high]+"_"+high).classList.add('high');
        document.getElementById('binary_cell_'+arr[high]+"_"+high).classList.add('high');
        document.getElementById('binary_cell_index_'+arr[high]+"_"+high).classList.add('high');
        

        if (low > high) {
            return null;
        }
        
        // Finds the centre of the array.
        let mid = Math.ceil((low + high) / 2);
        document.getElementById('binary_cell_position_'+arr[mid]+"_"+mid).innerHTML = "mid"
        document.getElementById('binary_cell_position_'+arr[mid]+"_"+mid).classList.add('success');
        document.getElementById('binary_cell_'+arr[mid]+"_"+mid).classList.add('success');
        document.getElementById('binary_cell_index_'+arr[mid]+"_"+mid).classList.add('success');
        
        console.log(low, high, mid);
        if (arr[mid] === item) {

            document.getElementById('binary_cell_position_'+arr[low]+"_"+low).classList.remove('low');
            document.getElementById('binary_cell_position_'+arr[high]+"_"+high).classList.remove('high');
            document.getElementById('binary_cell_position_'+arr[mid]+"_"+mid).classList.remove('success');

            document.getElementById('binary_cell_'+arr[low]+"_"+low).classList.remove('low');
            document.getElementById('binary_cell_'+arr[high]+"_"+high).classList.remove('high');
            document.getElementById('binary_cell_'+arr[mid]+"_"+mid).classList.remove('success');

            document.getElementById('binary_cell_index_'+arr[low]+"_"+low).classList.remove('low');
            document.getElementById('binary_cell_index_'+arr[high]+"_"+high).classList.remove('high');
            document.getElementById('binary_cell_index_'+arr[mid]+"_"+mid).classList.remove('success');

            document.getElementById('binary_cell_position_'+arr[mid]+"_"+mid).classList.add('success');
            document.getElementById('binary_cell_'+arr[mid]+"_"+mid).classList.add('success');
            document.getElementById('binary_cell_index_'+arr[mid]+"_"+mid).classList.add('success');
            document.getElementById('binary_search_result').innerHTML = mid;

            // If Found the item!
            midPrevious = mid;
            return mid;
        }
        
        if (item < arr[mid]) { 
            lowPrevious = low;
            highPrevious = high;
            midPrevious = mid;
            // Item is in the half from low to mid-1.
            return (binarySearch(arr, item, low, mid-1));
        }
        
        else { 
            // Item is in the half from other mid+1 to high.
            lowPrevious = low;
            highPrevious = high;
            midPrevious = mid;
            return binarySearch(arr, item, mid+1, high);
        }
    }, 1000 );
}
// *************************************************************************************
// swapColumns(document.getElementById("mytable"),1,2 );


// function swapColumns (table, colIndex1, colIndex2) {
//     console.log("table.insertBefore", table.insertBefore);
//     if (table && table.rows && table.insertBefore && colIndex1 !=colIndex2)
//     {
//         console.log('in swapColumns, rows='+table.rows.length);
//         for (let i = 0; i < table.rows.length; i++) 
//         {
//             let row = table.rows[i];
//             let cell1 = row.cells[colIndex1];
//             let cell2 = row.cells[colIndex2];
//             let siblingCell1 = row.cells[Number(colIndex1) + 1];
//             row.insertBefore(cell1, cell2);
//             row.insertBefore(cell2, siblingCell1);
//         }
//     }
// }
let selectionArray = [];
async function SelectionSortArray(){
    
    let valueFromInput = document.getElementById('selection_sort_array').value;
    if(valueFromInput.indexOf(',') === -1){
        selectionArray.push(valueFromInput);
    }
    selectionArray = valueFromInput.split(",");
    
    populateAsTable(selectionArray, 'selection_sortTable','selection_sort');

    await selection_sort(selectionArray);
    document.getElementById('selection_sortTable').classList.add('onSort')
}
let cell1, cell2;
async function selection_sort(array) {
    cell1 = null;
    cell2 = null;
    for(let i = 0; i < array.length; i++) {
      let min = i;
      for(let j = i + 1; j < array.length; j++) {
        if(array[j] < array[min]) {
          min = j;
        }
      }
      if(i !== min) {
          console.log('before :', array);
          console.log('i :', i, 'min :', min);
          await delay(2000);
          if(cell1){
            cell1.classList.remove('high');
            cell2.classList.remove('low');
          }
        swap(array, i, min, 'selection_sortTable');
        console.log('after: ',array);
      }
      
    }
    if(cell1){
        cell1.classList.remove('high');
        cell2.classList.remove('low');
    }
    return array;
  }

  function swap(array, i, j, id) {
      
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;

    let row = document.getElementById(id).rows[0];
    cell1 = row.cells[i+1];
    cell1.classList.add('high');
    cell2 = row.cells[j+1];
    cell2.classList.add('low');
    let siblingCell1 = row.cells[Number(i) + 2];
    row.insertBefore(cell1, cell2);
    row.insertBefore(cell2, siblingCell1);
  }

  function delay(n) {  
    n = n || 2000;
    return new Promise(done => {
      setTimeout(() => {
        done();
      }, n);
    });
  }

  let bubbleArray = [];
  async function BubbleSortArray(){
      
      let valueFromInput = document.getElementById('bubble_sort_array').value;
      if(valueFromInput.indexOf(',') === -1){
          bubbleArray.push(valueFromInput);
      }
      bubbleArray = valueFromInput.split(",");
      
      populateAsTable(bubbleArray, 'bubble_sortTable','bubble_sort');
  
      await bubble_sort(bubbleArray);
      document.getElementById('bubble_sortTable').classList.add('onSort')

  }
  async function bubble_sort(arr) {
    cell1 = null; cell2 = null;
    for (let j = arr.length - 1; j > 0; j--) {
      for (let i = 0; i < j; i++) {
        if (arr[i] > arr[i + 1]) {
           await delay(2000);
           console.log('before: ',arr);
           if(cell1){
            cell1.classList.remove('high');
            cell2.classList.remove('low');
          }
            swap(arr, (i + 1), i, 'bubble_sortTable');
        console.log('after: ',arr);
          
        }
      }
    }
    if(cell1){
        cell1.classList.remove('high');
        cell2.classList.remove('low');
    }
    console.log('bubble : ', arr)
  }
  
/* Inserrtion Sort */

let insertionArray = [];
  async function InsertionSortArray(){
      
      let valueFromInput = document.getElementById('insertion_sort_array').value;
      if(valueFromInput.indexOf(',') === -1){
          insertionArray.push(valueFromInput);
      }
      insertionArray = valueFromInput.split(",");
      
      populateAsTable(insertionArray, 'insertion_sortTable','insertion_sort');
  
      let returnarray = await insertion_sort(insertionArray);
      console.log(returnarray);
      document.getElementById('insertion_sortTable').classList.add('onSort')

  }

  async function insertion_sort(array){
    for(var i = 1 ;  i < array.length ;i++){
      var temp = array[ i ];
      let row = document.getElementById('insertion_sortTable').rows[0];
        cell1 = row.cells[i+1];
        cell1.classList.add('high');
        
      console.log('b4', array,' temp :',temp, cell1);

      for(var j = i-1 ; j>-1 && array[ j ]>temp; j--){
          console.log('done')
         array[ j+1 ] = array[ j ];
      }
      cell2 = row.cells[j+2];
      cell2.classList.add('high');
      array[ j+1] = temp;
        row.insertBefore(cell1, cell2);
      await delay(2000);
      cell1.classList.remove('high');
      cell2.classList.remove('high');
    }
    return array;
  }   
