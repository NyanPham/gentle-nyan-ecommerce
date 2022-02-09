export function formatDocs(docs) {
    return docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        }
    })
}

export function formatDoc(doc) {
    return {
        id: doc.id,
        ...doc.data()
    }
}

export function resetValue(inputFields) {
    inputFields.forEach(field => {
        field.value = ''
    })
}

export function getTotalBasket(basket) {
    return basket.reduce((total, item) => {
        return total + item.price * item.amount
    }, 0)
}

export function shuffle(items) {
    for (let i = items.length - 1; i >= 0; i--) {
        const randomIndex = Math.floor(Math.random() * i) 
        const oldValue = items[i]
        items[i] = items[randomIndex]
        items[randomIndex] = oldValue
    }

    return items
}