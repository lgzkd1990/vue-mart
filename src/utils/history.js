const History = {
    _history: [], // 历史记录堆栈
    install(Vue) {
        // 提供Vue插件所需安装方法
        Object.defineProperty(Vue.prototype, '$routerHistory', {
            get() {
                return History;
            }
        })
    },
    push(path) { // 入栈
        this._history.push(path);
    },
    pop() { // 出栈
        this._history.pop();
    },
    canBack() { // 能否返回
        return this._history.length > 1; //如果用histroy.length 可能会跳出当前app
    }
};
export default History;