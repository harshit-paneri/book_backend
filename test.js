let flag = true

setTimeout(() => {
    flag = false
}, 2000)

while(flag) {
    console.log('Hello', flag)
}
