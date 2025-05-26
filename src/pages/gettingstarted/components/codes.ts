export const kotlinGradleCode: string = `repositories {
    maven("https://api.modrinth.com/maven")
}

dependencies {
    // Option 1 (Recommended): Include fStats API to project for it to be available within your own jar
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
    // Option 1 (Recommended): Include fStats API to project for it to be available within your own jar
    include(modImplementation("maven.modrinth:fstats:<version>")
    
    // Option 2: Depend on fStats API, but require that users install it manually
    modImplementation "maven.modrinth:fstats:<version>"
}`

export const fabricJsonMinimal: string = `// Add fstats projectId as custom data
"custom": {
    "fstats": <projectId>
}

// Add library to suggested mods
"suggests": {
    "fstats-api": "*"
}`

export const fabricJsonFull: string = `{
  "id": "modid",
  "version": "1.0.0",
  "name": "Example mod",
  "description": "This is an example description! Tell everyone what your mod is about!",
  "authors": [
    "Me!"
  ],
  "contact": {
    "homepage": "https://fabricmc.net/",
    "sources": "https://github.com/FabricMC/fabric-example-mod"
  },
  "license": "CC0-1.0",
  "icon": "assets/modid/icon.png",
  "environment": "*",
  // Add fstats projectId as custom data 
  "custom": {
    "fstats": <projectId>
  },
  "entrypoints": {
    "main": [
      "com.example.ExampleMod"
    ],
    "client": [
      "com.example.ExampleModClient"
    ]
  },
  "mixins": [
    "modid.mixins.json",
    {
      "config": "modid.client.mixins.json",
      "environment": "client"
    }
  ],
  "depends": {
    "fabricloader": ">=0.16.2",
    "minecraft": "~1.21.1",
    "java": ">=21",
    "fabric-api": "*"
  },
  "suggests": {
    // Add library to suggested mods
    "fstats-api": "*"
  }
}`