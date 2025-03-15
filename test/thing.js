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
    for (var y = 0; y < this.height; y++) {
        let row = [];
        for (var x = 0; x < this.width; x++) {
          var idx = (this.width * y + x) << 2;
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