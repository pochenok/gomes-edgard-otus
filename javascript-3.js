function getPath(element) {
    let path = ''
    while (!!element) {
        let node_name = element.nodeName.toLowerCase()
        let current_path = node_name
        let node_id = element.id
        let node_class = element.className
        if (!!node_id) {
            current_path += '#' + node_id
        }
        if (!!node_class) {
            current_path += '.' + node_class.split(/[\s\n]+/).join('.')
        }
        let parent_node = element.parentElement
        if (!!parent_node) {
            current_path = '>' + current_path
        }
        path = current_path + path
        element = parent_node
    }
    return path
}