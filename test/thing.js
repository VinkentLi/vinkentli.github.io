var fs = require("fs"),
  PNG = require("pngjs").PNG;

let result = "";

fs.createReadStream("codejoint.png")
  .pipe(
    new PNG({
      filterType: 4,
    })
  )
  .on("parsed", function () {
    for (var y = 0; y < this.height; y += 2.5) {
        let row = [];
        for (var x = 0; x < this.width; x += 2.5) {
          var idx = (this.width * Math.floor(y) + Math.floor(x)) << 2;
          row.push(this.data[idx+3] > 128 ? 1 : 0);
        }
        result += JSON.stringify(row) + ",\n";
    }
    fs.writeFile("hi.txt", result, err => {
        if (err) {
          console.error(err);
        } else {
          // file written successfully
        }
    });
});