using Microsoft.EntityFrameworkCore.Migrations;

namespace softverska_firma.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Firme",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    BrojZaposlenih = table.Column<int>(type: "int", nullable: false),
                    GodinaOsnivanja = table.Column<int>(type: "int", nullable: false),
                    Lokacija = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    OsnovneInformacije = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Kontakt = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Firme", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Projekti",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Tip = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Prioritet = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    OcekivanoTrajanje = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    FirmaID = table.Column<int>(type: "int", nullable: true),
                    ProjekatID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projekti", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Projekti_Firme_FirmaID",
                        column: x => x.FirmaID,
                        principalTable: "Firme",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Projekti_Projekti_ProjekatID",
                        column: x => x.ProjekatID,
                        principalTable: "Projekti",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Programeri",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Starost = table.Column<int>(type: "int", nullable: false),
                    Senioritet = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Plata = table.Column<int>(type: "int", nullable: false),
                    ProjekatID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Programeri", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Programeri_Projekti_ProjekatID",
                        column: x => x.ProjekatID,
                        principalTable: "Projekti",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Programeri_ProjekatID",
                table: "Programeri",
                column: "ProjekatID");

            migrationBuilder.CreateIndex(
                name: "IX_Projekti_FirmaID",
                table: "Projekti",
                column: "FirmaID");

            migrationBuilder.CreateIndex(
                name: "IX_Projekti_ProjekatID",
                table: "Projekti",
                column: "ProjekatID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Programeri");

            migrationBuilder.DropTable(
                name: "Projekti");

            migrationBuilder.DropTable(
                name: "Firme");
        }
    }
}
