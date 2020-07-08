interface Data {
  headers: Header[]
  body: Body[]
}

interface Header {
  name: string, 
  id: string, 
  sortable: boolean 
}

interface Body {
  id: number,
  currentState: boolean,
  title: string,
  description: string,
  createdAt: string,
  dueDate: string,
  priority: string
}

interface Actions {
  class: any,
  name: any
  handler: any,
}

export { Actions, Data }