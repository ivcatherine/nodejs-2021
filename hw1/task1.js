process.stdin.on('data', data => {
    return data.slice(0,-1).reverse().toString()
}).pipe(process.stdout)