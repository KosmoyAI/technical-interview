{
  inputs = {
    nixpkgs = { url = "github:nixos/nixpkgs/nixos-24.11"; };

    devenv.url = "github:cachix/devenv";
  };

  nixConfig = {
    extra-trusted-public-keys =
      "devenv.cachix.org-1:w1cLUi8dv3hnoSPGAuibQv+f9TZLr6cv/Hm9XgU50cw=";
    extra-substituters = "https://devenv.cachix.org";
  };


  outputs = { self, nixpkgs, devenv, ... }@inputs:
    let
      linux-x86-pkgs = nixpkgs.legacyPackages."x86_64-linux";
    in
    {
      devShell = {
        x86_64-linux = devenv.lib.mkShell {
          inherit inputs;
          pkgs = linux-x86-pkgs;
          modules = [ ./devenv.nix ];
        };
      };
      formatter = {
        x86_64-linux = linux-x86-pkgs.nixfmt;
      };
    };
}
