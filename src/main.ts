import './css/style.css'
import FullList from './model/FullList'
import ListItem from './model/ListItem'
import ListTemplate from './template/ListTemplate'

const init = ():void=>{
    const fullList = FullList.instance

    const template = ListTemplate.instance


    const itemEntryForm = document.getElementById('itemEntryForm') as HTMLFormElement
    

    itemEntryForm.addEventListener('submit', (e : SubmitEvent): void =>{
        e.preventDefault()

        const input = document.getElementById('newItem') as HTMLInputElement

        const newEntryText : string = input.value.trim()

        if(!newEntryText.length) return


        const itemId : number = fullList.list.length ? parseInt(fullList.list[fullList.list.length-1].id) + 1 : 1

        const newItem = new ListItem(itemId.toString(),newEntryText)

        fullList.add(newItem)

        template.render(fullList)
        input.value = ''

    })
    const clearItems = document.getElementById('clearItemsButton') as HTMLButtonElement

    clearItems.addEventListener("click" , ():void=>{
        fullList.clear()
        template.clear()
    })

    fullList.load()
    template.render(fullList)
}


document.addEventListener('DOMContentLoaded', init)