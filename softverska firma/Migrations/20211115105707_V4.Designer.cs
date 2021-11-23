﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Models;

namespace softverska_firma.Migrations
{
    [DbContext(typeof(FContext))]
    [Migration("20211115105707_V4")]
    partial class V4
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.12")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Models.Firma", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BrojZaposlenih")
                        .HasColumnType("int");

                    b.Property<int>("GodinaOsnivanja")
                        .HasColumnType("int");

                    b.Property<string>("Kontakt")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Lokacija")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("OsnovneInformacije")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.HasKey("ID");

                    b.ToTable("Firme");
                });

            modelBuilder.Entity("Models.Programer", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Ime")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("Plata")
                        .HasColumnType("int");

                    b.Property<string>("Prezime")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int?>("ProjekatID")
                        .HasColumnType("int");

                    b.Property<string>("Senioritet")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<int>("Starost")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("ProjekatID");

                    b.ToTable("Programeri");
                });

            modelBuilder.Entity("Models.Projekat", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("FirmaID")
                        .HasColumnType("int");

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("OcekivanoTrajanje")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("Prioritet")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("Tip")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.HasKey("ID");

                    b.HasIndex("FirmaID");

                    b.ToTable("Projekti");
                });

            modelBuilder.Entity("Models.Programer", b =>
                {
                    b.HasOne("Models.Projekat", "Projekat")
                        .WithMany("Programeri")
                        .HasForeignKey("ProjekatID");

                    b.Navigation("Projekat");
                });

            modelBuilder.Entity("Models.Projekat", b =>
                {
                    b.HasOne("Models.Firma", "Firma")
                        .WithMany("Projekti")
                        .HasForeignKey("FirmaID");

                    b.Navigation("Firma");
                });

            modelBuilder.Entity("Models.Firma", b =>
                {
                    b.Navigation("Projekti");
                });

            modelBuilder.Entity("Models.Projekat", b =>
                {
                    b.Navigation("Programeri");
                });
#pragma warning restore 612, 618
        }
    }
}
