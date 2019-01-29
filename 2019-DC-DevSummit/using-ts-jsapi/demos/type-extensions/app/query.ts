import esri = __esri;

async function query(ground: esri.Ground, polyline: esri.Polyline) {
  const ret = await ground.queryElevation(polyline);
  const path = ret.geometry.paths[0];

  return path;
}