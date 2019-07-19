function EmailsEditor(atrs) {
    const items = new Map();

    atrs.container.className += " emails-container";

    const placeholder = document.createElement("span");
    placeholder.innerHTML = atrs.inputPlaceholder;
    placeholder.className = "emails-container__placeholder";

    const input = document.createElement("input");
    input.className = "emails-container__input";
    input.onfocus = () => {
        placeholder.className = "invisible";
    };

    input.onblur = () => {
        placeholder.className = "emails-container__placeholder";
        addItems(input.value);
        input.value = "";
    };

    input.onkeyup = event => {
        if (event.keyCode === 8 && input.value === "" && items.size) {
            const lastItemKey = Array.from(items.keys())[items.size - 1];
            deleteItem(lastItemKey);
        }
        if (
            event.keyCode === 13 ||
            (input.value && input.value[input.value.length - 1] === ",")
        ) {
            addItems(input.value);
            input.value = "";
        }
    };

    input.onpaste = () => {
        setTimeout(() => {
            addItems(input.value);
            input.value = "";
        }, 0);
    };

    atrs.container.append(placeholder, input);
    atrs.container.onclick = () => {
        input.focus();
    };

    const addItems = emails => {
        const emailList = emails
            .split(",")
            .map(item => item.trim())
            .filter(item => item);

        let isChanged = false;

        emailList.forEach(item => {
            if (items.has(item)) {
                return;
            }

            const isValid = emailValidator(item);
            isChanged = isValid;

            const elementContainer = document.createElement("span");
            elementContainer.className = `email${
                isValid ? "" : " email--wrong"
            }`;

            const elementContent = document.createElement("span");
            elementContent.textContent = item;
            elementContent.className = "email__content";

            const deleteButton = document.createElement("span");
            deleteButton.className = "email__delete-button";
            deleteButton.onclick = (key => {
                return event => {
                    event.stopPropagation();
                    deleteItem(key);
                };
            })(item);

            elementContainer.append(elementContent, deleteButton);

            items.set(item, {
                isValid,
                element: elementContainer
            });
            atrs.container.insertBefore(elementContainer, placeholder);
        });
        isChanged && dispatchChangeListEvent();
    };

    const deleteItem = key => {
        atrs.container.removeChild(items.get(key).element);
        const isChange = items.get(key).isValid;
        items.delete(key);
        isChange && dispatchChangeListEvent();
    };

    const deleteAllItems = () => {
        let isChange = false;

        if (items.size) {
            for (let key of items.keys()) {
                atrs.container.removeChild(items.get(key).element);
                isChange = items.get(key).isValid;
                items.delete(key);
            }
        }

        isChange && dispatchChangeListEvent();
    };

    const emailValidator = email => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    };

    this.addEmail = email => {
        addItems(email);
    };

    this.setEmails = emailList => {
        deleteAllItems();
        emailList.forEach(item => {
            addItems(item);
        });
    };

    this.getEmailList = () => {
        const list = [];
        for (let item of items) {
            item[1].isValid && list.push(item[0]);
        }
        return list;
    };

    const dispatchChangeListEvent = () => {
        const widgetEvent = new CustomEvent("changeList", {
            bubbles: true,
            detail: this.getEmailList()
        });
        atrs.container.dispatchEvent(widgetEvent);
    };
}
