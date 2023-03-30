//Theme
const darkIcon = document.getElementById('icon-sun')
const lightIcon = document.getElementById('icon-moon')
const lightTheme = document.getElementById('light-theme')
//List
const createTodo = document.getElementById('createTodo')
const theForm = document.getElementById('theForm')
const clearCompletedLink = document.getElementById('clearCompleted')
const listItems = document.getElementsByTagName('li')
let toDoListItems = []
const activeButton = document.getElementById('button-active')
const allButton = document.getElementById('button-all')
const completedButton = document.getElementById('button-completed')
const filterButtons = document.getElementsByName('display-button')
const unorderedList = document.getElementsByTagName('ul')[0]
const itemsCountDisplay = document.getElementById('items-left')
const toDoListItemLabel = document.getElementsByClassName('toDoListItemLabel')
let dragged


// Turn on light mode
darkIcon.addEventListener('click', function() {
    lightTheme.disabled = false
})
// Turn on dark mode
lightIcon.addEventListener('click', function() {
    lightTheme.disabled = true
})

// Display number of list items on load
function updateTotal() {
    itemCount = listItems.length - document.getElementsByClassName('completed-task').length
    itemsCountDisplay.innerHTML = itemCount + ' items left'
}

updateTotal()

// If input is empty, do nothing, otherwise add the it to the list
theForm.addEventListener('submit', createToDoList)

// LEt the user add to the list, create html elements that make up a list item
function createToDoList() {
    event.preventDefault()
    if (createTodo.value === '') {
        console.log("error")
    } else {
        toDoListItems.push(createTodo.value)
        listText = createTodo.value
        indexOfPushed = toDoListItems.length - 1
        let newListItem = document.createElement('li')
            newListItem.draggable = 'true'
            newListItem.id = indexOfPushed
        let newInputItem = document.createElement('input')
            newInputItem.type = 'checkbox'
            newInputItem.id = 'item-' + indexOfPushed
        let newLabelItem = document.createElement('label')
            newLabelItem.setAttribute('for', newInputItem.id)
            newLabelItem.setAttribute('class', 'toDoListItemLabel')
        let newStyledCheck = document.createElement('span')
            newStyledCheck.innerHTML = '<svg width="12px" height="9px" viewbox="0 0 12 9"><polyline points="1 5 4 8 11 1"></polyline></svg>'
        let newSpanText = document.createElement('span')
            newSpanText.innerText = createTodo.value
        unorderedList.append(newListItem)
        newListItem.append(newInputItem)
        newListItem.append(newLabelItem)
        newLabelItem.append(newStyledCheck)
        newLabelItem.append(newSpanText)
        createTodo.value = ''
        itemCount = toDoListItems.length
        itemsCountDisplay.innerText = itemCount + ' items left'    
    }
    
    determineCompleted()
    updateTotal()
    beingDragged()
}
   


// Assign a class to list item checked off, and remove it if it is unchecked
function determineCompleted() {
    for (i = 0; i < toDoListItemLabel.length; i++) {
        toDoListItemLabel[i].addEventListener('click', checkedIfChecked)
    }
}

function checkedIfChecked() {
    if (this.previousSibling.checked === false) {
        this.parentNode.setAttribute('class', 'completed-task')
        updateTotal()
    } else if (this.previousSibling.checked === true) {
        this.parentNode.removeAttribute('class', 'completed-task')
        updateTotal()
    } else {
        console.log('error relating to check if checked function')
    }
}


// If active input is CHECKED, when an item is checked it should automatically disappear or be "filtered" but able to be switched back on
for (i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener('input', function() {
        filterButtonName = this.getAttribute('id')
        filterList();
    })
}

function filterList() {
    switch (filterButtonName) {
        case 'button-all':
            for (i = 0; i < document.getElementsByTagName('li').length; i++) {
                document.getElementsByTagName('li')[i].style.display = ''
            }
            break;
        case 'button-active':
                for (i = 0; i < document.getElementsByClassName('completed-task').length; i++) {
                    document.getElementsByClassName('completed-task')[i].style.display = 'none'
                }
                for (i = 0; i < document.querySelectorAll("li:not([class])").length; i++) {
                    document.querySelectorAll("li:not([class])")[i].style.display = ''
            }
            break;
        case 'button-completed':
            for (i = 0; i < document.querySelectorAll("li:not([class])").length; i++) {
                    document.querySelectorAll("li:not([class])")[i].style.display = 'none'
            }
            for (i = 0; i < document.getElementsByClassName('completed-task').length; i++) {
                document.getElementsByClassName('completed-task')[i].style.display = ''
            }
            break;
        default: 
            break;
    }
    
}



// Clear completed tasks, i.e. all li with 'completed-task' class
clearCompletedLink.addEventListener('click', clearCompleted)


function clearCompleted() {
    Array.from(document.getElementsByClassName('completed-task')).forEach(completedTask => {
        event.preventDefault()
        completedTask.remove()
        updateTotal()

    })
}




// Drag function
function beingDragged() {
    let draggableItem
    let draggedIndex
    let droppedIndex

    document.addEventListener('dragstart', function(event) {
        draggableItem = event.target.id
        if (event.target.hasAttribute('draggable')) {
            event.dataTransfer.effectAllowed = 'move'
            event.dataTransfer.setData('text', draggableItem)
            for (i = 0; i < listItems.length; i++) {
                if (listItems[i] === event.target) {
                    draggedIndex = i
                }
            }
        }
    })

    document.addEventListener('dragover', (event) => {
        event.preventDefault()
    })


    document.addEventListener('drop', function(event) {
        event.preventDefault()
            if (event.target.hasAttribute('draggable') && event.target.id !== draggableItem) {
                for (let i = 0; i < listItems.length; i++) {
                    if (listItems[i] === event.target) {
                        droppedIndex = i
                    }
                }
                console.log(draggedIndex, droppedIndex)
                if (draggedIndex > droppedIndex) {
                    event.target.before(document.getElementById(event.dataTransfer.getData('text')))
                } else {
                    event.target.after(document.getElementById(event.dataTransfer.getData('text')))
                }
            }
    })

}
