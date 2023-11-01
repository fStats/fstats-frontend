export const kotlinGradleCode: string = `repositories {
    maven("https://api.modrinth.com/maven")
}

dependencies {
    // Option 1: Include fStats API to project for it available within your own jar IT'S ONLY ~9KB!
    include(modImplementation("maven.modrinth", "fstats", "<version>"))
    
    // Option 2: Depend on fStats API, but require that users install it manually
    modImplementation("maven.modrinth", "fstats", "<version>")
}`

export const javaGradleCode: string = `repositories {
    maven {
        url "https://api.modrinth.com/maven"
    }
}

dependencies {
    // Option 1: Include fStats API to project for it to be available within your own jar (IT'S ONLY ~9KB!)
    include(modImplementation("maven.modrinth:fstats:<version>")
    
    // Option 2: Depend on fStats API, but require that users install it manually
    modImplementation "maven.modrinth:fstats:<version>"
}`

export const fabricJsonSuggests: string = `"suggests": {
    "fstats-api": "*"
}`

export const fabricJsonSetup: string = `"custom": {
    "fstats": <projectId>
}`