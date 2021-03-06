
export class AdaptiveCard
{
    constructor() {
        this.m_AdaptiveCard = 
        {
            "type": "message",
            "attachments": [
                {
                    "contentType": "application/vnd.microsoft.card.adaptive",
                    "content": {
        
                        "type": "AdaptiveCard",
                        "body": [],
                        "actions": []
                    }
                }
            ]
        };
    }

    public addTitleWithIcon(title: string, icon: string) {
        var item = 
        {
            "type": "ColumnSet",
            "separation": "strong",
            "columns": [
                {
                    "type": "Column",
                    "size": icon != "" ? 1 : 0,
                    "items": [
                        {
                            "type": "Image",
                            "url": icon
                        }
                    ]
                },
                {
                    "type": "Column",
                    "size": 3,
                    "items": [
                        {
                            "type": "TextBlock",
                            "size": "extraLarge",
                            "color": "dark",
                            "weight": "bolder",
                            "text": title,
                            "horizontalAlignment": "left"
                        }
                    ]
                }
            ]
        }

        this.addItem(item);
    }

    public addInfoMessage(info: string) {
        this.addItem(
            {
                "type": "TextBlock",
                "size": "large",
                "color": "dark",
                "weight": "bolder",
                "text": info,
                "horizontalAlignment": "left"
            }
        );
    }

    public addItem(item: any) {
        this.m_AdaptiveCard["attachments"][0].content.body.push(item);
    }

    public addFact(title: string, value: string) {
        if (this.m_CurrentFactSet == null) {
            this.m_CurrentFactSet =
            {
                "type": "FactSet",
                "facts": []
            }

            this.addItem(this.m_CurrentFactSet);
        }


        this.m_CurrentFactSet.facts.push(
            {
                "title": title,
                "value": value
            }
        );
    }

    public addInputText(id: string, title: string = "") {

        if (title != "") {
            this.addItem(
                {
                    "type": "TextBlock"
                }
            );
    
        }

        this.addItem(
            {
                "type": "Input.Text",
                "id": id
            }
        );
    }

    public addMulticolumnSelector(image: string, name: string, description: string, action: any) {
        let columns: any[] = [];

        if ((typeof image == "string") && (image != "")) {
            columns.push(
                {
                    "type": "Column",
                    "size": 1,
                    "items": [
                        {
                            "type": "Image",
                            "url": image,
                            "size": "small"
                        }
                    ]
                }
            );    
        }

        columns.push(
            {
                "type": "Column",
                "size": 5,
                "items": [
                    {
                        "type": "TextBlock",
                        "size": "medium",
                        "color": "accent",
                        "textweight": "bolder",
                        "text": name
                    }
                ],
                "selectAction":
                {
                    "type": "Action.Submit",
                    "data": action
                }    
            }
        );

        columns.push(
            {
                "type": "Column",
                "size": 5,
                "items": [
                    {
                        "type": "TextBlock",
                        "size": "medium",
                        "horizontalAlignment": "left",
                        "text": description,
                        "isSubtle": true,
                        "wrap": true
                    }
                ]
            }
        );

        let row = 
        {
            "type": "ColumnSet",
            "separation": "strong",
            "columns": columns
        }

        this.addItem(row);
    }

    public addAction(title: string, id: string, params: any) {
        let action =            {
            "type": "Action.Submit",
            "title": title,
            "data":
            {
                "action": id
            }
        };

        for (var p in params) {
            action.data[p] = params[p];
        }
        this.m_AdaptiveCard["attachments"][0].content.actions.push(action);
    }

    public addActions(a: any, params: any) {

        var b: string = typeof a;

        if (typeof a === "string") {
            let action =            {
                "type": "Action.Submit",
                "title": a,
                "data":
                {
                    "action": a
                }
            };

            for (var p in params) {
                action.data[p] = params[p];
            }
            this.m_AdaptiveCard["attachments"][0].content.actions.push(action);
        } else if (typeof a === "object") {
            for (var item of a) {
                this.addActions(item, params);
            }
        }            
    }

    public getCard(): object
    {
        return this.m_AdaptiveCard;
    }

    private m_AdaptiveCard: object = null;
    private m_CurrentFactSet = null;
}
