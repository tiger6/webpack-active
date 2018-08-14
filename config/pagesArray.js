//获取page目录
var path = require('path');
var fs = require('fs');
let pagesArray = [];
function each_file(dir) {
  try {
    fs.readdirSync(dir).forEach(function(file) {
      var file_obj = {};
      var file_path = dir + '/' + file;
      var chunk_name = path.basename(file, '.html');
      file_obj['name'] = file;
      file_obj['title'] = 'active title';
      file_obj['filename'] = `${file}.html`;
      file_obj['chuckName'] = chunk_name;
      pagesArray.push(file_obj);
    });
  } catch (e) {}
}
each_file('./src/page');
// console.log('-------array', pagesArray);
//导出我们需要的html模板信息
module.exports = pagesArray;
