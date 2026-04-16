const fs = require("fs");
const path = require("path");

// 1. Obtener el nombre del módulo desde la terminal
const moduleName = process.argv[2];

if (!moduleName) {
  console.error("Error: Debes especificar el nombre del módulo.");
  process.exit(1);
}

// Convertir a PascalCase (ej: plane -> Plane)
const pascalName = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);

// 2. Definir la ruta base apuntando a tu backend
const basePath = path.join(__dirname, "backend", "src", moduleName);

// 3. Definir la estructura de carpetas
const folders = [
  "application/dto",
  "application/services",
  "domain/entities",
  "domain/repositories",
  "infrastructure/graphql/types",
  "infrastructure/graphql/resolvers",
  "infrastructure/persistence/typeorm/entities",
  "infrastructure/persistence/typeorm/mappers",
  "infrastructure/persistence/typeorm/repositories",
];

// 4. Definir los archivos y su contenido base
const files = {
  // --- DOMINIO ---
  [`domain/entities/${moduleName}.entity.ts`]: `export class ${pascalName}Entity {\n  id: string;\n}\n`,
  [`domain/repositories/${moduleName}.repository.interface.ts`]: `import { ${pascalName}Entity } from '../entities/${moduleName}.entity';\n\nexport abstract class ${pascalName}RepositoryInterface {\n  // Define tus métodos aquí, ej: create(data: ${pascalName}Entity): Promise<${pascalName}Entity>;\n}\n`,

  // --- APLICACIÓN ---
  [`application/dto/create-${moduleName}.input.ts`]: `import { InputType, Field } from '@nestjs/graphql';\n\n@InputType()\nexport class Create${pascalName}Input {\n  @Field()\n  // name: string;\n}\n`,
  [`application/services/${moduleName}.service.ts`]: `import { Injectable, Inject } from '@nestjs/common';\nimport { ${pascalName}RepositoryInterface } from '../../domain/repositories/${moduleName}.repository.interface';\n\n@Injectable()\nexport class ${pascalName}Service {\n  constructor(\n    @Inject('${pascalName}RepositoryInterface')\n    private readonly repository: ${pascalName}RepositoryInterface,\n  ) {}\n}\n`,

  // --- INFRAESTRUCTURA (GRAPHQL) ---
  [`infrastructure/graphql/types/${moduleName}.type.ts`]: `import { ObjectType, Field, ID } from '@nestjs/graphql';\n\n@ObjectType('${pascalName}')\nexport class ${pascalName}GraphQLModel {\n  @Field(() => ID)\n  id: string;\n}\n`,
  [`infrastructure/graphql/resolvers/${moduleName}.resolver.ts`]: `import { Resolver, Mutation, Args } from '@nestjs/graphql';\nimport { ${pascalName}GraphQLModel } from '../types/${moduleName}.type';\nimport { ${pascalName}Service } from '../../../application/services/${moduleName}.service';\nimport { Create${pascalName}Input } from '../../../application/dto/create-${moduleName}.input';\n\n@Resolver(() => ${pascalName}GraphQLModel)\nexport class ${pascalName}Resolver {\n  constructor(private readonly service: ${pascalName}Service) {}\n}\n`,

  // --- INFRAESTRUCTURA (TYPEORM) ---
  [`infrastructure/persistence/typeorm/entities/${moduleName}.orm-entity.ts`]: `import { Entity, PrimaryGeneratedColumn } from 'typeorm';\n\n@Entity('${moduleName}s')\nexport class ${pascalName}OrmEntity {\n  @PrimaryGeneratedColumn('uuid')\n  id: string;\n}\n`,
  [`infrastructure/persistence/typeorm/mappers/${moduleName}.mapper.ts`]: `import { ${pascalName}Entity } from '../../../../domain/entities/${moduleName}.entity';\nimport { ${pascalName}OrmEntity } from '../entities/${moduleName}.orm-entity';\n\nexport class ${pascalName}Mapper {\n  static toDomain(ormEntity: ${pascalName}OrmEntity): ${pascalName}Entity {\n    const entity = new ${pascalName}Entity();\n    entity.id = ormEntity.id;\n    return entity;\n  }\n}\n`,
  [`infrastructure/persistence/typeorm/repositories/typeorm-${moduleName}.repository.ts`]: `import { Injectable } from '@nestjs/common';\nimport { InjectRepository } from '@nestjs/typeorm';\nimport { Repository } from 'typeorm';\nimport { ${pascalName}RepositoryInterface } from '../../../../domain/repositories/${moduleName}.repository.interface';\nimport { ${pascalName}OrmEntity } from '../entities/${moduleName}.orm-entity';\n\n@Injectable()\nexport class TypeOrm${pascalName}Repository implements ${pascalName}RepositoryInterface {\n  constructor(\n    @InjectRepository(${pascalName}OrmEntity)\n    private readonly repository: Repository<${pascalName}OrmEntity>,\n  ) {}\n}\n`,

  // --- MÓDULO RAÍZ ---
  [`${moduleName}.module.ts`]: `import { Module } from '@nestjs/common';\nimport { TypeOrmModule } from '@nestjs/typeorm';\nimport { ${pascalName}Resolver } from './infrastructure/graphql/resolvers/${moduleName}.resolver';\nimport { ${pascalName}Service } from './application/services/${moduleName}.service';\nimport { ${pascalName}OrmEntity } from './infrastructure/persistence/typeorm/entities/${moduleName}.orm-entity';\nimport { TypeOrm${pascalName}Repository } from './infrastructure/persistence/typeorm/repositories/typeorm-${moduleName}.repository';\n\n@Module({\n  imports: [TypeOrmModule.forFeature([${pascalName}OrmEntity])],\n  providers: [\n    ${pascalName}Resolver,\n    ${pascalName}Service,\n    {\n      provide: '${pascalName}RepositoryInterface',\n      useClass: TypeOrm${pascalName}Repository,\n    },\n  ],\n  exports: [${pascalName}Service],\n})\nexport class ${pascalName}Module {}\n`,
};

// 5. Crear todo
console.log(`\n Iniciando andamiaje para el módulo: ${moduleName}`);

try {
  // Crear carpetas
  folders.forEach((folder) => {
    const fullPath = path.join(basePath, folder);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
  });

  // Crear archivos
  for (const [filePath, content] of Object.entries(files)) {
    const fullFilePath = path.join(basePath, filePath);
    if (!fs.existsSync(fullFilePath)) {
      fs.writeFileSync(fullFilePath, content);
      console.log(`Creado: ${filePath}`);
    } else {
      console.log(`Ya existe (saltado): ${filePath}`);
    }
  }

  console.log(
    `\n ¡Módulo ${pascalName} creado exitosamente en backend-zone/src/${moduleName}!`,
  );
  console.log(
    ` IMPORTANTE: No olvides importar ${pascalName}Module en tu app.module.ts\n`,
  );
} catch (error) {
  console.error("Ocurrió un error creando la estructura:", error);
}