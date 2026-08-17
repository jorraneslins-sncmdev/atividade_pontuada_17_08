const localVersion = "1.0.0";

const atualizacoes = [
    {
        titulo: "Funcionalidade de login",
        descricao: "Foi adicionada uma nova funcionalidade ao sistema.",
        data: "17/08/2026"
    },
    {
        titulo: "Correção de erro",
        descricao: "Foi corrigido um problema encontrado no sistema.",
        data: "18/08/2026"
    }
];

function semverCompare(a, b) {
    const pa = a.split('.').map(Number);
    const pb = b.split('.').map(Number);
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
        const na = pa[i] || 0;
        const nb = pb[i] || 0;
        if (na > nb) return 1;
        if (na < nb) return -1;
    }
    return 0;
}

async function fetchRemoteVersion(url = 'versao.json') {
    const resp = await fetch(url, { cache: 'no-store' });
    if (!resp.ok) throw new Error('Não foi possível obter versão remota');
    return resp.json();
}

async function checkForUpdates(options = {}) {
    const url = options.url || 'versao.json';
    const remote = await fetchRemoteVersion(url);
    const remoteVersion = remote.version || '0.0.0';
    const cmp = semverCompare(localVersion, remoteVersion);
    return {
        updateAvailable: cmp === -1,
        localVersion,
        remoteVersion,
        remote
    };
}

function renderAtualizacoes(containerId = 'updates') {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    const section = document.createElement('section');
    const h2 = document.createElement('h2');
    h2.textContent = 'Atualizações';
    section.appendChild(h2);

    atualizacoes.forEach(at => {
        const box = document.createElement('div');
        box.className = 'atualizacao-item';
        const t = document.createElement('h3');
        t.textContent = at.titulo;
        const p = document.createElement('p');
        p.textContent = at.descricao;
        const s = document.createElement('small');
        s.textContent = at.data;
        box.appendChild(t);
        box.appendChild(p);
        box.appendChild(s);
        section.appendChild(box);
    });

    container.appendChild(section);
}

export { atualizacoes, localVersion, renderAtualizacoes, checkForUpdates };