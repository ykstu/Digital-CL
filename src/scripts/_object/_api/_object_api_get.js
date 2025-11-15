const get  = {

    async getMinecraftVersion(){
        return  await (await fetch("https://piston-meta.mojang.com/mc/game/version_manifest.json")).json();
    },
    async getFabricMetadata() {
        return await (await fetch("https://maven.fabricmc.net/net/fabricmc/fabric-installer/maven-metadata.xml")).text();
    },
    async getForgeMetadata() {
        return await (await fetch("https://maven.minecraftforge.net/net/minecraftforge/forge/maven-metadata.xml")).text();
    },
    async getNeoForgeMetadata() {
        return await (await fetch("https://maven.neoforged.net/releases/net/neoforged/neoforge/maven-metadata.xml")).text();
    },
    async getQuiltMetadata() {
        return await (await fetch("https://maven.quiltmc.org/repository/release/org/quiltmc/quilt-installer/maven-metadata.xml")).text();
    },
}
get.getMinecraftVersion().then(r => {})
