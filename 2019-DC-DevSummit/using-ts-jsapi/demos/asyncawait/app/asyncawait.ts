import ElevationLayer from "esri/layers/ElevationLayer";
import { Polyline } from "esri/geometry";
import { densify as densifyAsync } from "esri/geometry/geometryEngineAsync";

/**
 * An async function is basically a function that returns a
 * Promise. Only async functions may await on other asynchronous
 * functions.
 *
 * Within an async function, you can await on anything that is
 * a PromiseLike (e.g. a regular function returning a promise can
 * also be awaited upon).
 *
 * @param line the line to get elevation for
 */
export async function makeElevationProfile(line: Polyline) {
    // Densify the line a bit first
    const densifiedLine = await densifyAsync(line, 10, "meters");

    // Query elevation asynchronously
    const layer = new ElevationLayer({ url: "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer" });
    const lineWithZ = (await layer.queryElevation(line)).geometry as Polyline;

    // Exaggerate z-values
    for (const path of lineWithZ.paths) {
        for (const point of path) {
            point[2] *= 2;
        }
    }

    return lineWithZ;
}

export function makeElevationProfilePromiseBased(line: Polyline) {
    // Densify the line a bit first
    return densifyAsync(line, 10, "meters")
        .then(densified => {
            // Query elevation asynchronously
            const layer = new ElevationLayer({ url: "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer" });
            return layer.queryElevation(line);
        })
        .then(result => {
            const lineWithZ = result.geometry as Polyline;

            // Exaggerate z-values
            for (const path of lineWithZ.paths) {
                for (const point of path) {
                    point[2] *= 2;
                }
            }

            return lineWithZ;
        });
}
