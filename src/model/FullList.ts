import ListItem from "./ListItem"

interface List{
    list: ListItem[],

    load():void,
    save():void,
    clear(): void,
    add(item: ListItem) : void,
    remove(id: string): void
}

export default class FullList implements List{

    static instance : FullList = new FullList()
    private _list : ListItem[]

    private constructor(list : ListItem[] = []){
        this._list = list
    }

    get list (): ListItem[]{
        return this._list
    }

    load(): void {
        const storeList : string | null = localStorage.getItem("my_list")
        if(typeof storeList !== 'string') return

        const parseList : {_id: string , _item : string , _checked : boolean} [] = JSON.parse(storeList)

        parseList.forEach(item=>{
            const newListItem = new ListItem(
                item._id ,
                item._item,
                item._checked
            )
            FullList.instance.add(newListItem)
        })
    }

    save(): void {
        localStorage.setItem("my_list" , JSON.stringify(this._list))
    }
    clear(): void {
        this._list = []
        this.save()
    }

    add(item: ListItem): void {
        this._list.push(item)
        this.save()
    }
    remove(id: string): void {
        this._list = this._list.filter(item=> item.id !==id)
        this.save()
    }

}