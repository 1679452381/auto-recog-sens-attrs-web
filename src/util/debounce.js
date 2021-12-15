//  function debounce(fn, delary) {
//     let t = null  // 初始化计数器
//     return () => {
//         if (t) clearTimeout(t)
//         if(!t) fn.apply(this, arguments)
//         t = setTimeout(() => {
//             t = null
//         }, delary)
//     }
// }
// export default debounce