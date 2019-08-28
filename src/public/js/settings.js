window.__MAIN_RPC_ADDR__ = '{{ default .Env.MAIN_RPC_ADDR "main.jnode.network" }}'
window.__MAIN_RPC_PORT__ = '{{ default .Env.MAIN_RPC_PORT "443" }}'

window.__ROPSTEN_RPC_ADDR__ = '{{ default .Env.ROPSTEN_RPC_ADDR "ropsten.jnode.network" }}'
window.__ROPSTEN_RPC_PORT__ = '{{ default .Env.ROPSTEN_RPC_PORT "443" }}'

window.__TICKER_API__ = '{{ default .Env.TICKER_API "https://api-fiat-courses.jwallet.network" }}'
window.__BLOCKEXPLORER_API__ = '{{ default .Env.BLOCKEXPLORER_API "https://api-blockchain-service.jwallet.network" }}'
