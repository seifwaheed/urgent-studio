param(
  [string]$PhotosRoot = (Join-Path $PSScriptRoot '..\..\urgent-web\public\team')
)

$ErrorActionPreference = 'Stop'
$sanity = Join-Path $PSScriptRoot '..\node_modules\.bin\sanity.cmd'
$projectId = 'ugk0i5rc'
$dataset = 'production'

$team = @(
  @{slug='waheed-mahmoud'; en='Waheed Mahmoud'; ar='وحيد محمود'; roleEn='Owner'; roleAr='المالك'},
  @{slug='ahmed-sayed'; en='Ahmed Sayed'; ar='أحمد سيد'},
  @{slug='asmaa-el-malah'; en='Asmaa El Malah'; ar='أسماء الملاح'},
  @{slug='tamer-hassan'; en='Tamer Hassan'; ar='تامر حسن'},
  @{slug='mohamed-saied'; en='Mohamed Saied'; ar='محمد سعيد'},
  @{slug='toqa-mohamed'; en='Toqa Mohamed'; ar='تقى محمد'},
  @{slug='alaa-salama'; en='Alaa Salama'; ar='علاء سلامة'},
  @{slug='mohamed-mahmoud'; en='Mohamed Mahmoud'; ar='محمد محمود'},
  @{slug='ahmed-mohamed'; en='Ahmed Mohamed'; ar='أحمد محمد'},
  @{slug='aya-ibrahim'; en='Aya Ibrahim'; ar='آية إبراهيم'},
  @{slug='hazem-sadeq'; en='Hazem Sadeq'; ar='حازم صادق'},
  @{slug='ehab-hassan'; en='Ehab Hassan'; ar='إيهاب حسن'},
  @{slug='salama-mohamed'; en='Salama Mohamed'; ar='سلامة محمد'}
)

$documents = @()
for ($index = 0; $index -lt $team.Count; $index++) {
  $member = $team[$index]
  $photoPath = Join-Path $PhotosRoot "$($member.slug).png"
  if (-not (Test-Path -LiteralPath $photoPath)) { throw "Missing team photo: $photoPath" }

  Write-Host "Uploading $($member.en)..."
  $upload = (& $sanity assets upload --file $photoPath --project-id $projectId --dataset $dataset --filename "$($member.slug).png" --type image | Out-String)
  if ($LASTEXITCODE -ne 0) { throw "Image upload failed for $($member.en): $upload" }
  $asset = ($upload.Substring($upload.IndexOf('{')) | ConvertFrom-Json).asset

  $documents += @{
    _id = "agent-$($member.slug)"
    _type = 'agent'
    name = @{en = $member.en; ar = $member.ar}
    slug = @{_type = 'slug'; current = $member.slug}
    role = @{en = $(if ($member.roleEn) {$member.roleEn} else {'Urgent team'}); ar = $(if ($member.roleAr) {$member.roleAr} else {'فريق أيرجينت'})}
    photo = @{
      _type = 'localizedImage'
      image = @{_type = 'image'; asset = @{_type = 'reference'; _ref = $asset._id}}
      alt = @{en = $member.en; ar = $member.ar}
    }
    displayOrder = $index
    symbol = 'paperclip'
  }
}

$manifest = [IO.Path]::GetTempFileName()
try {
  $documents | ConvertTo-Json -Depth 12 | Set-Content -LiteralPath $manifest -Encoding utf8
  & $sanity documents create $manifest --project-id $projectId --dataset $dataset --replace
  if ($LASTEXITCODE -ne 0) { throw 'Team import failed.' }
} finally {
  Remove-Item -LiteralPath $manifest -Force -ErrorAction SilentlyContinue
}
