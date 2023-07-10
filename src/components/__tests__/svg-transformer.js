module.exports = {
    process: (src) =>
        `module.exports = "${src.replace(/"/g, '\\"').replace(/(\r\n|\r|\n)/g, '')}";`,
}
