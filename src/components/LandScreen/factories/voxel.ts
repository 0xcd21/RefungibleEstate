import * as THREE from 'three'
import { State } from '../interfaces'

let cubeGeo: THREE.BoxBufferGeometry

export default (
	state: State,
	position: THREE.Vector3,
	material: THREE.MeshLambertMaterial,
	name: string,
	ratio : number = 1
) => {
	cubeGeo = new THREE.BoxBufferGeometry(50 * ratio, 50 * ratio, 50 * ratio)
	let voxel = new THREE.Mesh(cubeGeo, material)
	voxel.position.copy(position)
	voxel.name = name
	state.scene.add(voxel)
	state.objects.push(voxel)
}