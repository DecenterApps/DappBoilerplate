import { exec } from 'child_process';
import fs from 'fs';
import Web3 from 'web3';

let web3 = new Web3();

web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const getBlockNumber = () =>
  new Promise((resolve, reject) => {
    web3.eth.getBlockNumber((error, latestBlock) => {
      if (error) {
        return reject(error);
      }

      return resolve(latestBlock);
    });
  });

function locations(string, substring) {
  const a = [];
  let i = -1;
  while ((i = string.indexOf(substring, i + 1)) >= 0) a.push(i);
  return a;
}

function getPosition(string, subString, index) {
  return string.split(subString, index).join(subString).length;
}

const getMigrationInfo = (stdOutParam) => {
  const migrationinfo = {
    network: '',
    contracts: {}
  };

  const stdout = stdOutParam;

  const deployingString = 'Deploying ';
  const runningMigrationString = 'Running migration:';
  const artifactsString = 'Saving artifacts...';
  const usingNetworkString = 'Using network ';

  let network = stdout.substring(stdout.indexOf(usingNetworkString));
  network = network.substring(usingNetworkString.length, network.indexOf('.'));
  network = network.substring(1, network.lastIndexOf('\''));

  migrationinfo.network = network;

  const runningMigrationsLoc = locations(stdout, runningMigrationString);
  const artifactSections = locations(stdout, artifactsString);

  for (let i = 0; i < artifactSections.length; i += 1) {
    const section = stdout.substring(runningMigrationsLoc[i], artifactSections[i]);

    let contractName = section.substring(
      section.indexOf(deployingString) + deployingString.length,
      getPosition(section, '.', 2)
    );

    const address = section.substr(section.indexOf(`${contractName}: `) + contractName.length + 2, 42);
    migrationinfo.contracts[contractName] = address;
  }

  return migrationinfo;
};

const getTruffleCommand = () => {
  let network = '';

  process.argv.forEach(function (val) {
    if (typeof val === 'string' && (val.indexOf('network') !== -1)) {
      network = val.substr(8);
    }
  });

  if (network) return `truffle migrate --network=${network}`;

  return 'truffle migrate';
};

const getFilesFromDir = (path) => {
  const contractJson = {};
  const dirFiles = fs.readdirSync(path);

  dirFiles.forEach((filename) => {
    contractJson[filename.replace(/(.*)\.(.*?)$/, '$1')] = fs.readFileSync(`${path}/${filename}`, 'utf-8');
  });

  return contractJson;
};

/**
 * Execute simple shell command (async wrapper).
 * @param {String} cmd
 * @return {Object} { stdout: String, stderr: String }
 */
async function sh(cmd) {
  return new Promise(function (resolve, reject) {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

const main = async () => {
  const contractsPath = './build/contracts';
  const ethServiceConfigPath = './client/modules/config.json';
  const truffleCommand = getTruffleCommand();

  let migrationinfo = {};
  let contractDist = {};
  let ethereumServiceConfig = {};
  let currentBlock = 0;

  // let ehereumServiceConfig = {
  //   network: '',
  //   contracts: [
  //     {
  //       contractAddress: '',
  //       startingBlock: '',
  //       abi: []
  //     }
  //   ]
  // };

  try {
    const { stdout } = await sh(truffleCommand);

    currentBlock = await getBlockNumber();
    migrationinfo = getMigrationInfo(stdout);
    contractDist = getFilesFromDir(contractsPath);
  } catch (err) {
    throw err;
  }

  const contracts = migrationinfo.contracts;

  if (Object.keys(contracts).length > 0) {
    ethereumServiceConfig.contracts = [];

    for (const contractName in contracts) {
      ethereumServiceConfig.contracts.push({
        name: contractName,
        contractAddress: contracts[contractName],
        startingBlock: currentBlock,
        abi: JSON.parse(contractDist[contractName]).abi
      });
    }
  } else {
    ethereumServiceConfig = JSON.parse(fs.readFileSync(ethServiceConfigPath, 'utf-8'));
  }

  ethereumServiceConfig.network = migrationinfo.network;

  fs.writeFileSync(ethServiceConfigPath, JSON.stringify(ethereumServiceConfig, null, 2), 'utf8');
};

main();
