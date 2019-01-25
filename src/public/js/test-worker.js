
self.onmessage = (msg) => {
    if (!(self.crypto || self.msCrypto) && 
        !(self.crypto.getRandomValues || self.msCrypto.getRandomValues)) {
        self.postMessage('fail')
    } else {
        self.postMessage('ok')
    }
}
