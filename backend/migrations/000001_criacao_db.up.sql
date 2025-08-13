create table usuarios(
	login varchar(25),
	senha varchar(512) not null,
	nome varchar(50) not null,
	nivel_acesso smallint not null default 1,
	constraint pk_usuarios primary key (login)
);

create table pessoas (
	id_pessoa serial,
	cpf_cnpj varchar(14) not null,
	rg_ie varchar(15),
	fg_tipo varchar(1) default 'F',
	razao_social varchar(255) not null,
	nome_fantasia varchar(255),
	data_nascimento date,
	genero varchar(1),
	email varchar(100),
	telefone varchar(50),
	celular varchar(50),
	cep varchar(8),
	logradouro varchar(255),
	numero varchar(10) default 'SN',
	complemento varchar(50),
	bairro varchar(100),
	cidade varchar(100),
	estado varchar(20),
	uf varchar(2),
	pais varchar(50),
	data_cadastro timestamp not null default now(),
	constraint pk_pessoas primary key (id_pessoa)
);

create unique index idx_pessoas_01 on pessoas (cpf_cnpj);

create table clientes (
	id_cliente serial,
	id_pessoa int not null,
	limite_credito money,
	observacao varchar(255),
	fg_ativo varchar(1),
	constraint pk_clientes primary key (id_cliente),
	constraint fk_clientes_01 foreign key (id_pessoa)
	references pessoas (id_pessoa)
);

create index idx_clientes_01 on clientes (id_pessoa);

create table tecnicos (
	id_tecnico serial,
	id_pessoa int not null,
	usuario varchar(25) not null,
	especialidade varchar(100),
	data_admissao date,
	fg_ativo varchar(1) default 'N',
	constraint pk_tecnicos primary key (id_tecnico),
	constraint fk_tecnicos_01 foreign key (id_pessoa)
	references pessoas (id_pessoa),
	constraint fk_tecnicos_02 foreign key (usuario)
	references usuarios (login)
);

create index idx_tecnicos_01 on tecnicos (id_pessoa);

create table marcas (
	id_marca serial,
	nome varchar(100) not null,
	constraint pk_marcas primary key (id_marca)
);


create table modelos (
	id_modelo serial,
	id_marca int not null,
	nome varchar(100) not null,
	constraint pk_modelos primary key (id_modelo),
	constraint fk_modelos_01 foreign key (id_marca)
	references marcas (id_marca)
);

create index idx_modelos_01 on modelos (id_marca); 
create unique index idx_modelos_02 on modelos (id_marca, id_modelo);

create table tipos_produtos (
	id_tipo serial2,
	descricao varchar(50) not null,
	constraint pk_tipos_produtos primary key (id_tipo)
);

create table produtos (
	id_produto serial,
	id_modelo int not null,
	id_tipo int2 not null,
	descricao varchar(150) not null,
	categoria varchar(50),
	observacao varchar(255),
	constraint pk_produtos primary key (id_produto),
	constraint fk_produtos_01 foreign key (id_modelo)
	references modelos (id_modelo),
	constraint fk_produtos_02 foreign key (id_tipo)
	references tipos_produtos (id_tipo)
);

create index idx_produtos_01 on produtos (id_modelo);
create index idx_produtos_02 on produtos (id_tipo);


create table servicos (
	id_servico serial,
	nome varchar(50) not null,
	descricao varchar(150),
	valor_servico money,
	tempo_estimado numeric(3, 1),
	categoria varchar(50),
	constraint pk_servicos primary key (id_servico)
);

create table ordens_servico (
	id_os serial,
	usuario varchar(25) not null,
	id_cliente int not null,
	id_produto int not null,
	data_incio date default now(),
	data_fim date,
	total_horas_trabalhadas numeric(3, 2),
	valor_os money,
	descricao varchar(50) not null,
	observacao varchar(255),
	constraint pk_os primary key (id_os),
	constraint fk_os_01 foreign key (usuario)
	references usuarios (login),
	constraint fk_os_02 foreign key (id_cliente)
	references clientes (id_cliente),
	constraint fk_os_03 foreign key (id_produto)
	references produtos (id_produto)
);

create index idx_os_01 on ordens_servico (usuario);
create index idx_os_02 on ordens_servico (id_cliente);
create index idx_os_03 on ordens_servico (id_produto);

create table status_os (
	id_status serial2,
	descricao varchar(50) not null,
	constraint pk_status_os primary key (id_status)
);

create table controle_os (
	id_controle serial,
	id_os int not null,
	id_tecnico int not null,
	id_servico int not null,
	id_status int2 not null,
	data_inicio date default now(),
	data_fim date,
	status int2 not null,
	observacao varchar(255),
	constraint pk_controle_os primary key (id_controle),
	constraint fk_controle_os_01 foreign key (id_os)
	references ordens_servico (id_os),
	constraint fk_controle_os_02 foreign key (id_tecnico)
	references tecnicos (id_tecnico),
	constraint fk_controle_os_03 foreign key (id_servico)
	references servicos (id_servico),
	constraint fk_controle_os_04 foreign key (id_status)
	references status_os (id_status)
);

create index idx_controle_os_01 on controle_os (id_os);
create index idx_controle_os_02 on controle_os (id_tecnico);
create index idx_controle_os_03 on controle_os (id_servico);
create index idx_controle_os_04 on controle_os (id_status);