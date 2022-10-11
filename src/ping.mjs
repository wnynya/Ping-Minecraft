import dns from '@wanyne/dns';
import IP from '@wanyne/ip';
import mp from 'minecraft-protocol';

/**
 * @async
 * @function ping
 * @desc Minecraft ping
 * @param {string} host
 * @param {number} port default 25565 max 65535
 * @param {number} timeout default 2000
 */
async function ping(host, port = 25565, options = {}) {
  let timeout = options.timeout || 2000;
  let filterBogon = options.filterBogon || false;
  let dnsServer = options.dnsServer;
  let version = options.version;

  const result = {
    error: undefined,
    type: 'ping/minecraft',
    host: host,
    ip: '',
    port: port,
    version: {
      name: '',
      protocol: 0,
    },
    description: '',
    players: {
      current: 0,
      max: 0,
      sample: [],
    },
    favicon: '',
    time: 0,
  };

  host = host.toLowerCase();
  result.host = host;

  const ips = await dns.ips(host, dnsServer);
  result.ip = ips[0];

  if (filterBogon && new IP(ip).isBogon()) {
    result.error = 'EBOGONIP';
    result.status = 'error';
    return result;
  }

  port = Math.max(1, Math.min(65535, port * 1 || 25565));
  result.port = port;

  const timestamp = new Date().getTime();

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      result.error = 'ETIMEDOUT';
      resolve(result);
    }, timeout).unref();
    mp.ping({
      host: host,
      port: port,
      version: version,
    })
      .then((res) => {
        clearTimeout(timer);

        res?.remote?.ip ? (result.ip = res?.remote?.ip) : null;

        if (result.ip && filterBogon && new IP(result.ip).isBogon()) {
          result.error = 'EBOGONIP';
          return result;
        }

        result.version.name = res.version.name || res.version || '';
        result.version.protocol = res.version.protocol || res.protoco || 0;
        result.description = res.motd || res.description || '';
        result.players.current = res.playerCount || res.players.online || 0;
        result.players.max = res.maxPlayers || res.players.max || 0;
        result.players.sample = res.players.sample || [];
        result.favicon = res.favicon || '';
        result.time = new Date().getTime() - timestamp;
        resolve(result);
      })
      .catch((error) => {
        clearTimeout(timer);
        result.error = error;
        resolve(result);
      });
  });
}

export default ping;
