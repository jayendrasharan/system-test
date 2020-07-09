

export class Task {
    public currentState: boolean;
    public title: string;
    public description: string;
    public createdAt: Date | string;
    public dueDate: Date | string;
    public priority: 'high' | 'low' | 'medium' | 'none';
    public checked?: boolean;
    [key: string]: any;


    constructor() {
        this.createdAt = new Date(Date.now()).toLocaleDateString();
        this.currentState = true;
        this.priority = 'none';
    }
}


export type UIOption =
    {
        label?: string;
        value?: string;
    }

export const Priority: UIOption[] = [
    { label: 'None', value: 'none' },
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
]