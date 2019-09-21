import * as $ from 'jquery';

// chrome.storage.local.clear()

chrome.runtime.sendMessage({ type: "isActive" }, (message) => {
    const isActive = message.result
    console.log(isActive)
    if (isActive) {
        setEvent();
        setValue();
    }
});

function setEvent() {
    $(document).on('change', (e: any) => {
        const target: HTMLInputElement = e.target
        let value = target.value
        const tagName = target.tagName
        if (tagName === 'input') {
            value = target.name
        }
        if (tagName === 'select') {
            value = target.value
        }
        chrome.storage.sync.get((data) => {
            let obj = data['point_automator']
            if (!isDefined(obj)) obj = {}
            if (!isDefined(obj.name)) obj.name = {}
            if (!isDefined(obj.id)) obj.id = {}

            if (isDefined(target.name)) {
                obj.name[target.name] = value;
            }
            if (isDefined(target.id)) {
                obj.id[target.id] = value;
            }
            console.log(target)
            console.log(obj)
            chrome.storage.sync.set({ 'point_automator': obj })
        })
    })
}


function setValue() {
    chrome.storage.sync.get((data) => {
        let obj = data['point_automator']
        console.log(obj)
        Object.keys(obj.name).forEach((key) => {
            const elem: any = document.getElementsByName(key)[0]
            if (isDefined(elem)) {
                console.log(elem)
                elem.value = obj.name[key]
            }
        })
    })
}


function isDefined(s: any) {
    return s !== '' && s !== null && s !== undefined
}