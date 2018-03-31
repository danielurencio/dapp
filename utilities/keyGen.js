function keyGen() {
   var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
   var count = 73;
   var key = '';

   while(count > 0) {
      key += chars[Math.round(Math.random() * (chars.length - 1))];
      count--;
   }

   return key + "__";
};

module.exports = keyGen;
