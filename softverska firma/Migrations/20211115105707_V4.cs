using Microsoft.EntityFrameworkCore.Migrations;

namespace softverska_firma.Migrations
{
    public partial class V4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projekti_Projekti_ProjekatID",
                table: "Projekti");

            migrationBuilder.DropIndex(
                name: "IX_Projekti_ProjekatID",
                table: "Projekti");

            migrationBuilder.DropColumn(
                name: "ProjekatID",
                table: "Projekti");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProjekatID",
                table: "Projekti",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Projekti_ProjekatID",
                table: "Projekti",
                column: "ProjekatID");

            migrationBuilder.AddForeignKey(
                name: "FK_Projekti_Projekti_ProjekatID",
                table: "Projekti",
                column: "ProjekatID",
                principalTable: "Projekti",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
