import ping from './src/ping.mjs';
export default ping;
export { ping };

if (process.argv.length > 2) {
  const q = process.argv[2];
  const optionsArray = [];
  for (var i = 3; i < process.argv.length; i++) {
    optionsArray.push(process.argv[i]);
  }

  let dnsServer = 0;
  let version = 0;

  for (const opt of optionsArray) {
    if (
      opt == '-version' ||
      opt == '-ver' ||
      opt == '-v' ||
      opt == 'version' ||
      opt == 'ver' ||
      opt == 'v'
    ) {
      version = undefined;
    } else if (version == undefined) {
      version = opt;
    } else if (opt == '-dns' || opt == '-d' || opt == 'dns' || opt == 'd') {
      dnsServer = false;
    } else if (dnsServer == false) {
      dnsServer = opt;
    }
  }

  console.log('Running ping-minecraft at', new Date(), '\n');

  console.log('target  :', q);
  dnsServer ? console.log('dns     :', dnsServer) : null;

  ping(q, {
    filterBogon: false,
    dnsServer: dnsServer,
    version: version,
  })
    .then((res) => {
      if (res.ip) {
        console.log('ip      :', res.ip, '\n');
      }
      if (res.error) {
        console.log('error   :', res.error, '\n');
        return;
      }
      console.log('port    :', res.port, '\n');
      console.log(
        'version :',
        res.version.name + ' (' + res.version.protocol + ')'
      );
      console.log('players :', res.players.current + '/' + res.players.max);
      console.log(
        '  sample  :',
        res.players.sample && res.players.sample.length > 0
          ? res.players.sample.length + ' players'
          : '0 players'
      );
      for (const s of res.players.sample) {
        console.log('    ' + s.name + ' (' + s.id + ')');
      }
      console.log('motd    :', res.description);
      console.log('favicon :', res.favicon.length, 'chars');
      console.log('');
    })
    .catch((err) => {
      console.error(err);
    });
}
