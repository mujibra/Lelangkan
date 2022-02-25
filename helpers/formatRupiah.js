function formatRp(val){
    let formatted = val.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})
    return formatted
}

// console.log(formatRp(100000))

module.exports = formatRp