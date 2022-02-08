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