const URL = require('url');
const url = new URL.URL('http://tan.com:80/a/?t=3&c=5#abc');
// console.log(url);

// 将url字符串转为对象
/* URL.parse('http://tan.com:80/a/?t=3&c=5#abc')
    Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'tan.com:80',
  port: '80',
  hostname: 'tan.com',
  hash: '#abc',
  search: '?t=3&c=5',
  query: 't=3&c=5',
  pathname: '/a/',
  path: '/a/?t=3&c=5',
  href: 'http://tan.com:80/a/?t=3&c=5#abc'
}
*/

/* new URL.URL('http://tan.com:80/a/?t=3&c=5#abc')
  URL {
    href: 'http://tan.com/a/?t=3&c=5#abc',
    origin: 'http://tan.com',
    protocol: 'http:',
    username: '',
    password: '',
    host: 'tan.com',
    hostname: 'tan.com',
    port: '',
    pathname: '/a/',
    search: '?t=3&c=5',
    searchParams: URLSearchParams { 't' => '3', 'c' => '5' },
    hash: '#abc'
  }
 */

//将对象转为url字符串

var obj = {
    href: 'http://tan.com/a/?t=3&c=5#abc',
    origin: 'http://tan.com',
    protocol: 'http:',
    username: '',
    password: '',
    host: 'tan.com',
    hostname: 'tan.com',
    port: '',
    pathname: '/a/',
    search: '?t=3&c=5',
    hash: '#abc'
}   
var u = URL.format(obj);
console.log(u); //  url http://tan.com:80/a/?t=3&c=5#abc 
                // URL http://tan.com/a/?t=3&c=5#abc